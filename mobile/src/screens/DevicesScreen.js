import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

export default function DevicesScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Text style={styles.headerBackText}>Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis dispositivos</Text>
        </View>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconCircle}>
              <Feather name="smartphone" size={26} color={colors.textPrimary} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.deviceName}>Echo Dot (Cocina)</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot]} />
                <Text style={styles.statusTextConectado}>Conectado</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardRight}>
            <Feather name="battery" size={20} color={colors.primaryGray50} />
            <Text style={styles.batteryText}>82%</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconCircle}>
              <Feather name="monitor" size={26} color={colors.textPrimary} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.deviceName}>Tablet</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, styles.statusDotOff]} />
                <Text style={styles.statusTextDesconectado}>Desconectado</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardRight}>
            <Feather name="wifi" size={20} color={colors.primaryGray50} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} style={styles.addCard}>
          <View style={styles.addIconCircle}>
            <Feather name="plus" size={16} color={colors.primaryGray50} />
          </View>
          <Text
            style={styles.addCardText}
            onPress={() => navigation.navigate("LinkDevice")}
          >
            Agregar dispositivo secundario
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.primaryButton}>
        <Text
          style={styles.primaryButtonText}
          onPress={() => navigation.navigate("LinkCompanion")}
        >
          Vincular como apoyo
        </Text>
        <Feather name="link" size={22} color={colors.primary0} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary10,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
  },
  headerBackText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.secondary50,
    borderRadius: 30,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.secondary80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardInfo: {
    justifyContent: "center",
  },
  deviceName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
    backgroundColor: colors.success,
  },
  statusDotOff: {
    backgroundColor: colors.primaryGray50,
  },
  statusTextConectado: {
    color: colors.primary50,
    fontSize: 12,
    fontWeight: "500",
  },
  statusTextDesconectado: {
    color: colors.primaryGray50,
    fontSize: 12,
    fontWeight: "500",
  },
  cardRight: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  batteryText: {
    color: colors.primaryGray50,
    fontSize: 12,
    marginTop: 4,
  },
  addCard: {
    borderWidth: 1,
    borderColor: colors.primaryGray50,
    borderStyle: "dashed",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 8,
  },
  addCardText: {
    color: colors.primaryGray50,
    fontSize: 15,
    fontWeight: "500",
  },
  spacer: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: colors.primary50,
    borderRadius: 36,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  primaryButtonText: {
    color: colors.primary0,
    fontSize: 22,
    fontWeight: "600",
    marginRight: 12,
  },
});
