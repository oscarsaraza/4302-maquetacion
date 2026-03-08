import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useAlarms } from '../context/AlarmContext';
import AlarmCard from '../components/AlarmCard';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'Buenos días';
  if (hour >= 12 && hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function getGreetingIcon() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 19) return 'weather-sunny';
  return 'moon-waning-crescent';
}

function getNextAlarmInfo(alarms) {
  const now = new Date();
  const enabledAlarms = alarms.filter((a) => a.enabled);

  if (enabledAlarms.length === 0) return null;

  let closest = null;
  let minDiff = Infinity;

  for (const alarm of enabledAlarms) {
    const [h, m] = alarm.time.split(':').map(Number);
    let alarmH = h;

    // Convertir a 24h
    if (alarm.period === 'PM' && alarmH !== 12) alarmH += 12;
    if (alarm.period === 'AM' && alarmH === 12) alarmH = 0;

    const alarmDate = new Date(now);
    alarmDate.setHours(alarmH, m, 0, 0);

    // Si ya pasó hoy, será mañana
    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const diff = alarmDate - now;
    if (diff < minDiff) {
      minDiff = diff;
      closest = alarm;
    }
  }

  if (!closest) return null;

  const totalMin = Math.round(minDiff / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;

  let label = 'Próxima alarma en ';
  if (hours > 0) label += `${hours}h `;
  label += `${mins}m`;

  return { alarm: closest, label };
}

export default function HomeScreen({ navigation }) {
  const { alarms } = useAlarms();
  const insets = useSafeAreaInsets();

  const greeting = useMemo(() => getGreeting(), []);
  const greetingIcon = useMemo(() => getGreetingIcon(), []);
  const nextInfo = useMemo(() => getNextAlarmInfo(alarms), [alarms]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.user}>Usuario</Text>
          </View>
          <MaterialCommunityIcons
            name="cog"
            size={28}
            color={colors.textSecondary}
          />
        </View>

        <View style={styles.nextAlarmRow}>
          <MaterialCommunityIcons
            name={greetingIcon}
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.nextAlarmText}>
            {nextInfo ? nextInfo.label : 'Sin alarmas activas'}
          </Text>
        </View>

        {alarms.map((alarm) => (
          <AlarmCard
            key={alarm.id}
            alarm={alarm}
            onPress={() =>
              navigation.navigate('AlarmForm', {
                alarmId: alarm.id,
                isNew: false,
              })
            }
          />
        ))}
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 8 }]}>
        <Text style={styles.devicesText}>Mis dispositivos</Text>
      </View>

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 16 }]}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('AlarmForm', {
            alarmId: null,
            isNew: true,
          })
        }
      >
        <MaterialCommunityIcons name="plus" size={28} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  user: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  nextAlarmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    marginBottom: 24,
  },
  nextAlarmText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  devicesText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 16,
    backgroundColor: colors.fab,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
