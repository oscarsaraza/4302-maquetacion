import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

export default function LinkDeviceScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 247, // Altura de la caja (250) - altura de la línea (3)
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startAnimation();
  }, [translateY]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 20),
          paddingTop: Math.max(insets.top, 20),
        },
      ]}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={styles.headerCancelText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.headerHelpText}>Ayuda</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Vincular dispositivo</Text>

      <View style={styles.content}>
        <View style={styles.scannerBox}>
          <View style={[styles.scanCorner, styles.scanCornerTL]} />
          <View style={[styles.scanCorner, styles.scanCornerTR]} />
          <View style={[styles.scanCorner, styles.scanCornerBL]} />
          <View style={[styles.scanCorner, styles.scanCornerBR]} />

          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{ translateY }],
              },
            ]}
          />
        </View>

        <View style={styles.instructionPill}>
          <Feather
            name="eye"
            size={18}
            color={colors.primary50}
            style={styles.pillIcon}
          />
          <Text style={styles.pillText}>Apunta la cámara al código QR</Text>
        </View>

        <Text style={styles.instructionText}>
          Escanee el código QR mostrado en tu dispositivo principal para
          sincronizar las alarmas
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Feather name="image" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Feather name="video" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Feather name="zap" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
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
    fontSize: 16,
    fontWeight: "500",
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scannerBox: {
    width: 250,
    height: 250,
    backgroundColor: colors.primaryGray50,
    position: "relative",
    marginBottom: 40,
  },
  scanCorner: {
    position: "absolute",
    width: 35,
    height: 35,
    borderColor: colors.primary50,
  },
  scanCornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderTopLeftRadius: 12,
  },
  scanCornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopRightRadius: 12,
  },
  scanCornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderBottomLeftRadius: 12,
  },
  scanCornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primary50,
  },
  instructionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary50,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 30,
  },
  pillIcon: {
    marginRight: 10,
  },
  pillText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  instructionText: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondary50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
