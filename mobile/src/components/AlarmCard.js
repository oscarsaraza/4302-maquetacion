import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useAlarms } from '../context/AlarmContext';

function CustomSwitch({ value, onToggle }) {
  return (
    <TouchableOpacity
      style={[styles.switchTrack, value && styles.switchTrackOn]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={[styles.switchThumb, value && styles.switchThumbOn]} />
    </TouchableOpacity>
  );
}

export default function AlarmCard({ alarm, onPress }) {
  const { toggleAlarm } = useAlarms();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons
            name={alarm.id === '1' ? 'clock-outline' : 'weather-sunny'}
            size={16}
            color={colors.textSecondary}
          />
          <Text style={styles.label}>{alarm.label}</Text>
        </View>
        <CustomSwitch
          value={!!alarm.enabled}
          onToggle={() => toggleAlarm(alarm.id)}
        />
      </View>

      <View style={styles.timeRow}>
        <Text style={styles.time}>{alarm.time}</Text>
        <Text style={styles.period}>{alarm.period}</Text>
      </View>

      <Text style={styles.name}>{alarm.name}</Text>

      <View style={styles.challengeRow}>
        <MaterialCommunityIcons
          name={alarm.challengeIcon}
          size={14}
          color={colors.textMuted}
        />
        <Text style={styles.challenge}>{alarm.challenge}</Text>
        {alarm.dots > 0 && (
          <View style={styles.dotsContainer}>
            {Array.from({ length: alarm.dots }).map((_, i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  time: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 2,
  },
  period: {
    color: colors.textSecondary,
    fontSize: 18,
    marginLeft: 6,
  },
  name: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challenge: {
    color: colors.textMuted,
    fontSize: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  switchTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.switchTrackOff,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchTrackOn: {
    backgroundColor: colors.switchTrackOn,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.switchThumbOff,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
    backgroundColor: colors.switchThumbOn,
  },
});
