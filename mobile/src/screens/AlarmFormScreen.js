import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useAlarms } from '../context/AlarmContext';

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const SOUND_OPTIONS = [
  'Canto de aves',
  'Timbre',
  'Melodía suave',
  'Campanas',
  'Naturaleza',
];
const VIBRATION_OPTIONS = ['Pulsos', 'Constante', 'Creciente', 'Ninguna'];
const CHALLENGE_OPTIONS = [
  'Cognitivo',
  'Matemático',
  'Memoria',
  'Agitar para apagar',
  'Ninguno',
];

const defaultAlarm = {
  time: '07:00',
  period: 'AM',
  name: 'Rutina matutina',
  challenge: 'Reto de sentadillas',
  challengeIcon: 'dumbbell',
  enabled: true,
  days: [true, true, true, true, true, false, false],
  sound: 'Canto de aves',
  vibration: 'Pulsos',
  desafio: 'Cognitivo',
  obligatorio: true,
  snoozeMax: 5,
};

function CustomSwitch({ value, onToggle }) {
  return (
    <TouchableOpacity
      style={[switchStyles.track, value && switchStyles.trackOn]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={[switchStyles.thumb, value && switchStyles.thumbOn]} />
    </TouchableOpacity>
  );
}

const switchStyles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.switchTrackOff,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  trackOn: {
    backgroundColor: colors.switchTrackOn,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.switchThumbOff,
  },
  thumbOn: {
    alignSelf: 'flex-end',
    backgroundColor: colors.switchThumbOn,
  },
});

const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 3;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function ScrollColumn({ data, selected, onSelect }) {
  const scrollRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const idx = data.indexOf(selected);
    if (idx >= 0 && scrollRef.current && !isScrolling.current) {
      scrollRef.current.scrollTo({ y: idx * ITEM_HEIGHT, animated: false });
    }
  }, [selected, data]);

  const onScrollEnd = useCallback((e) => {
    isScrolling.current = false;
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, data.length - 1));
    if (data[clamped] !== selected) {
      onSelect(data[clamped]);
    }
  }, [data, selected, onSelect]);

  return (
    <View style={wheelStyles.columnWrapper}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScrollBeginDrag={() => { isScrolling.current = true; }}
        onMomentumScrollEnd={onScrollEnd}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
        nestedScrollEnabled
        contentOffset={{ x: 0, y: data.indexOf(selected) * ITEM_HEIGHT }}
      >
        {data.map((item) => (
          <View key={item} style={wheelStyles.item}>
            <Text style={[wheelStyles.itemText, item === selected && wheelStyles.itemTextSelected]}>
              {String(item).padStart(2, '0')}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={wheelStyles.highlight} pointerEvents="none" />
    </View>
  );
}

const wheelStyles = StyleSheet.create({
  columnWrapper: {
    height: WHEEL_HEIGHT,
    width: 80,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 36,
    fontWeight: '300',
    color: colors.textMuted,
    opacity: 0.4,
  },
  itemTextSelected: {
    fontSize: 48,
    color: colors.textPrimary,
    opacity: 1,
  },
  highlight: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});

function TimeWheel({ hours, minutes, period, onSetHours, onSetMinutes, onTogglePeriod }) {
  return (
    <View style={styles.wheelContainer}>
      <View style={styles.wheelRow}>
        <ScrollColumn data={HOURS} selected={hours} onSelect={onSetHours} />
        <Text style={styles.wheelColon}>:</Text>
        <ScrollColumn data={MINUTES} selected={minutes} onSelect={onSetMinutes} />
        <TouchableOpacity onPress={onTogglePeriod} style={styles.periodButton}>
          <Text style={styles.wheelPeriod}>{period}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DaySelector({ days, onToggle }) {
  return (
    <View style={styles.dayRow}>
      {DAY_LABELS.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dayChip, days[index] && styles.dayChipSelected]}
          onPress={() => onToggle(index)}
        >
          <Text
            style={[
              styles.dayChipText,
              days[index] && styles.dayChipTextSelected,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function DropdownField({ value, onPress }) {
  return (
    <TouchableOpacity style={styles.dropdown} onPress={onPress}>
      <Text style={styles.dropdownText}>{value}</Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={20}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

function OptionModal({ visible, title, options, selected, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  item === selected && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    item === selected && styles.modalOptionTextSelected,
                  ]}
                >
                  {item}
                </Text>
                {item === selected && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Stepper({ value, onDecrement, onIncrement }) {
  return (
    <View style={styles.stepperRow}>
      <TouchableOpacity style={styles.stepperButton} onPress={onDecrement}>
        <MaterialCommunityIcons name="minus" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.stepperValue}>{value}</Text>
      <TouchableOpacity
        style={[styles.stepperButton, styles.stepperButtonHighlight]}
        onPress={onIncrement}
      >
        <MaterialCommunityIcons name="plus" size={20} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

export default function AlarmFormScreen({ route, navigation }) {
  const { alarmId, isNew } = route.params;
  const { alarms, addAlarm, updateAlarm } = useAlarms();

  const existingAlarm = alarmId ? alarms.find((a) => a.id === alarmId) : null;
  const initial = existingAlarm || defaultAlarm;

  const [hours, minutes] = initial.time.split(':').map(Number);

  const [is12h, setIs12h] = useState(true);
  const [currentHours, setCurrentHours] = useState(hours);
  const [currentMinutes, setCurrentMinutes] = useState(minutes);
  const [period, setPeriod] = useState(initial.period);
  const [days, setDays] = useState(initial.days);
  const [alarmName, setAlarmName] = useState(initial.name);
  const [sound, setSound] = useState(initial.sound);
  const [vibration, setVibration] = useState(initial.vibration);
  const [desafio, setDesafio] = useState(initial.desafio);
  const [obligatorio, setObligatorio] = useState(initial.obligatorio);
  const [snoozeMax, setSnoozeMax] = useState(initial.snoozeMax);

  const [soundModal, setSoundModal] = useState(false);
  const [vibrationModal, setVibrationModal] = useState(false);
  const [challengeModal, setChallengeModal] = useState(false);

  const title = isNew ? 'Nueva alarma' : 'Editar alarma';

  const toggleDay = (index) => {
    const updated = [...days];
    updated[index] = !updated[index];
    setDays(updated);
  };

  const setHours = useCallback((h) => setCurrentHours(h), []);
  const setMinutes = useCallback((m) => setCurrentMinutes(m), []);

  const togglePeriod = () => {
    setPeriod((p) => (p === 'AM' ? 'PM' : 'AM'));
  };

  const handleSave = () => {
    const alarmData = {
      time: `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`,
      period,
      name: alarmName,
      days,
      sound,
      vibration,
      desafio,
      obligatorio,
      snoozeMax,
      challenge: initial.challenge,
      challengeIcon: initial.challengeIcon,
      enabled: initial.enabled !== undefined ? initial.enabled : true,
    };

    if (isNew) {
      addAlarm(alarmData);
    } else {
      updateAlarm(alarmId, alarmData);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerAction}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.headerAction, styles.headerSave]}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {/* 12h / 24h toggle */}
        <View style={styles.formatToggle}>
          <TouchableOpacity
            style={[styles.formatButton, is12h && styles.formatButtonActive]}
            onPress={() => setIs12h(true)}
          >
            <Text style={[styles.formatText, is12h && styles.formatTextActive]}>
              12h
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.formatButton, !is12h && styles.formatButtonActive]}
            onPress={() => setIs12h(false)}
          >
            <Text style={[styles.formatText, !is12h && styles.formatTextActive]}>
              24h
            </Text>
          </TouchableOpacity>
        </View>

        {/* Time wheel */}
        <TimeWheel
          hours={currentHours}
          minutes={currentMinutes}
          period={period}
          onSetHours={setHours}
          onSetMinutes={setMinutes}
          onTogglePeriod={togglePeriod}
        />

        {/* Repetir */}
        <Text style={styles.sectionLabel}>Repetir</Text>
        <DaySelector days={days} onToggle={toggleDay} />

        {/* Nombre de alarma */}
        <Text style={styles.sectionLabel}>Nombre de alarma</Text>
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputText}
            value={alarmName}
            onChangeText={setAlarmName}
            placeholder="Nombre de alarma"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Sonido */}
        <View style={styles.soundHeader}>
          <Text style={styles.sectionLabel}>Sonido</Text>
          <Text style={styles.previewLink}>Vista previa</Text>
        </View>
        <DropdownField value={sound} onPress={() => setSoundModal(true)} />

        {/* Tipo de vibración */}
        <Text style={styles.sectionLabel}>Tipo de vibración</Text>
        <DropdownField value={vibration} onPress={() => setVibrationModal(true)} />

        {/* Desafío para despertar */}
        <View style={styles.desafioHeader}>
          <Text style={styles.sectionLabel}>Desafío para despertar</Text>
          <View style={styles.obligatorioRow}>
            <Text style={styles.obligatorioLabel}>Obligatorio</Text>
            <CustomSwitch
              value={!!obligatorio}
              onToggle={() => setObligatorio(!obligatorio)}
            />
          </View>
        </View>
        <DropdownField value={desafio} onPress={() => setChallengeModal(true)} />

        {/* Número máximo de posponer */}
        <Text style={styles.sectionLabel}>Número máximo de posponer</Text>
        <Stepper
          value={snoozeMax}
          onDecrement={() => setSnoozeMax(Math.max(0, snoozeMax - 1))}
          onIncrement={() => setSnoozeMax(snoozeMax + 1)}
        />
      </ScrollView>

      {/* Modals */}
      <OptionModal
        visible={soundModal}
        title="Sonido"
        options={SOUND_OPTIONS}
        selected={sound}
        onSelect={setSound}
        onClose={() => setSoundModal(false)}
      />
      <OptionModal
        visible={vibrationModal}
        title="Tipo de vibración"
        options={VIBRATION_OPTIONS}
        selected={vibration}
        onSelect={setVibration}
        onClose={() => setVibrationModal(false)}
      />
      <OptionModal
        visible={challengeModal}
        title="Desafío para despertar"
        options={CHALLENGE_OPTIONS}
        selected={desafio}
        onSelect={setDesafio}
        onClose={() => setChallengeModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerAction: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  headerSave: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },

  /* 12h/24h toggle */
  formatToggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 3,
    marginBottom: 20,
  },
  formatButton: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
  },
  formatButtonActive: {
    backgroundColor: colors.primary,
  },
  formatText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  formatTextActive: {
    color: colors.background,
  },

  /* Time wheel */
  wheelContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  wheelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelColon: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: '300',
    marginHorizontal: 4,
  },
  periodButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  wheelPeriod: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 8,
  },

  /* Day selector */
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 10,
    marginTop: 4,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayChip: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dayChipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  dayChipTextSelected: {
    color: colors.background,
  },

  /* Input field */
  inputField: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
  },
  inputText: {
    color: colors.textPrimary,
    fontSize: 15,
  },

  /* Sound header */
  soundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  /* Dropdown */
  dropdown: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: colors.textPrimary,
    fontSize: 15,
  },

  /* Desafío header */
  desafioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  obligatorioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  obligatorioLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  /* Stepper */
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonHighlight: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepperValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  modalOptionSelected: {
    backgroundColor: colors.inputBackground,
  },
  modalOptionText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  modalOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  modalClose: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalCloseText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
