import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";
import Svg, { Circle, Rect } from "react-native-svg";
import QrCode from "../components/QrCode";

export default function LinkCompanionScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={styles.headerCancelText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.headerHelpText}>Ayuda</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Vincular compañero</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.artBox}>
          <Svg width={400} height={120} viewBox="0 0 400 120">
            <Rect
              x={60}
              y={30}
              width={40}
              height={80}
              rx={8}
              fill={colors.primary50}
            />
            <Rect x={64} y={36} width={32} height={60} rx={2} fill="#eee" />
            <Circle cx={80} cy={103} r={3} fill="#eee" />
            <Rect
              x={300}
              y={30}
              width={40}
              height={80}
              rx={8}
              fill={colors.secondary50}
            />
            <Rect x={304} y={36} width={32} height={60} rx={2} fill="#eee" />
            <Circle cx={320} cy={103} r={3} fill="#eee" />
            <Circle cx={170} cy={50} r={3} fill={colors.secondary50}></Circle>
            <Circle cx={230} cy={80} r={3} fill={colors.primary50}></Circle>
          </Svg>
        </View>

        <View style={styles.qrBox}>
          <View style={[styles.qrCorner, styles.qrCornerTL]} />
          <View style={[styles.qrCorner, styles.qrCornerTR]} />
          <View style={[styles.qrCorner, styles.qrCornerBL]} />
          <View style={[styles.qrCorner, styles.qrCornerBR]} />

          <QrCode width={280} height={280} />

          <Text style={styles.qrText}>Escanéame</Text>
        </View>

        <Text style={styles.titleText}>Escanea para vincular</Text>
        <Text style={styles.subtitleText}>
          Abre la app en tu otro teléfono y apunta aquí
        </Text>

        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Esperando escaneo...</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.bottomButton}>
        <View style={styles.bottomButtonTextContainer}>
          <Text style={styles.bottomButtonTitle}>¿No puedes escanear?</Text>
          <Text style={styles.bottomButtonSub}>Compartir enlace</Text>
        </View>
        <Feather name="share-2" size={24} color={colors.primary10} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 16,
  },
  headerCancelText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  headerHelpText: {
    color: colors.primary50,
    fontSize: 14,
    fontWeight: "500",
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  artBox: {
    backgroundColor: "#EAE6F0",
    borderRadius: 30,
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  artBoxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "100%",
    paddingVertical: 50,
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  qrCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: colors.primary50,
  },
  qrCornerTL: {
    top: 20,
    left: 20,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 16,
  },
  qrCornerTR: {
    top: 20,
    right: 20,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopRightRadius: 16,
  },
  qrCornerBL: {
    bottom: 20,
    left: 20,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomLeftRadius: 16,
  },
  qrCornerBR: {
    bottom: 20,
    right: 20,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 16,
  },
  qrText: {
    color: colors.primary0,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  titleText: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitleText: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary50,
    marginRight: 10,
  },
  statusText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  bottomButton: {
    backgroundColor: colors.primary50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 36,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  bottomButtonTextContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  bottomButtonTitle: {
    color: colors.primary10,
    fontSize: 16,
    fontWeight: "600",
  },
  bottomButtonSub: {
    color: colors.primary10,
    fontSize: 20,
    fontWeight: "700",
  },
});
