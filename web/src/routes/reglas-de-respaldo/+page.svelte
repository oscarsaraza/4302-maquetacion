<script>
  import Nav from "$lib/components/nav.svelte";
  import Sun from "$lib/components/icons/sun.svelte";
  import ArrowDown from "$lib/components/icons/arrow-down.svelte";

  let alarms = $state([
    {
      id: 1,
      time: "07:00",
      period: "AM",
      label: "Alarma matutina",
      days: [true, true, true, true, true, true, true],
      disposicion: "Todas del Cuerpo",
      tiempoEspera: "5 min",
      contactoRed: "Acción a preparar ante la transferencia",
      masterActivado: true,
      maxSnooze: 3,
    },
    {
      id: 2,
      time: "09:00",
      period: "AM",
      label: "Alarma de respaldo",
      days: [true, true, true, true, true, false, false],
      disposicion: "Torso",
      tiempoEspera: "10 min",
      contactoRed: "Notificación al contacto de respaldo",
      masterActivado: true,
      maxSnooze: 1,
    },
  ]);

  const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

  const DISPOSICION_OPTIONS = [
    "Todas del Cuerpo",
    "Torso",
    "Extremidades",
    "Cabeza",
  ];

  const TIEMPO_ESPERA_OPTIONS = ["5 min", "10 min", "15 min", "30 min"];

  const CONTACTO_OPTIONS = [
    "Acción a preparar ante la transferencia",
    "Notificación al contacto de respaldo",
    "Activar protocolo de emergencia",
  ];

  function toggleDay(alarmId, dayIndex) {
    alarms = alarms.map((a) => {
      if (a.id === alarmId) {
        const newDays = [...a.days];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...a, days: newDays };
      }
      return a;
    });
  }

  function updateField(alarmId, field, value) {
    alarms = alarms.map((a) =>
      a.id === alarmId ? { ...a, [field]: value } : a
    );
  }

  function adjustSnooze(alarmId, delta) {
    alarms = alarms.map((a) => {
      if (a.id === alarmId) {
        const newVal = Math.max(1, a.maxSnooze + delta);
        return { ...a, maxSnooze: newVal };
      }
      return a;
    });
  }

  function addAlarm() {
    const newAlarm = {
      id: Date.now(),
      time: "08:00",
      period: "AM",
      label: "Nueva alarma",
      days: [true, true, true, true, true, false, false],
      disposicion: "Todas del Cuerpo",
      tiempoEspera: "5 min",
      contactoRed: "Acción a preparar ante la transferencia",
      masterActivado: true,
      maxSnooze: 1,
    };
    alarms = [...alarms, newAlarm];
  }
</script>

<main class="min-h-screen flex flex-col gap-8 p-8 max-w-7xl mx-auto">
  <Nav />

  <div class="flex items-center justify-start gap-4">
    <Sun size="small" fill="fill-primary-500"></Sun>
    <div>
      <h1>
        Reglas de <span class="text-primary-500">activación</span> de respaldo
      </h1>
      <p class="text-sm text-[#B3ACA0] mt-1">
        Configura los roles de respaldo para cada una de las alarmas
      </p>
    </div>
  </div>

  <div class="flex flex-col gap-8">
    {#each alarms as alarm (alarm.id)}
      <div class="bg-secondary-800 rounded-3xl p-8 flex flex-col gap-6">
        <!-- Time + Days row -->
        <div class="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div class="flex items-baseline gap-2">
              <span class="text-5xl font-light text-primary-950"
                >{alarm.time}</span
              >
              <span class="text-xl text-primary-500">{alarm.period}</span>
            </div>
            <p class="text-sm text-[#B3ACA0] mt-1">{alarm.label}</p>
          </div>
          <div>
            <p class="text-sm text-[#B3ACA0] mb-2">Repetir</p>
            <div class="flex gap-2">
              {#each DAY_LABELS as label, i}
                <button
                  class="w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-colors
                    {alarm.days[i]
                    ? 'bg-primary-500 text-secondary-800'
                    : 'bg-[#3A2E07] text-[#B3ACA0]'}"
                  onclick={() => toggleDay(alarm.id, i)}
                >
                  {label}
                </button>
              {/each}
            </div>
          </div>
        </div>

        <!-- Settings grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]"
              >Disposición de respaldo</label
            >
            <select
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 appearance-none"
              value={alarm.disposicion}
              onchange={(e) =>
                updateField(alarm.id, "disposicion", e.target.value)}
            >
              {#each DISPOSICION_OPTIONS as opt}
                <option value={opt}>{opt}</option>
              {/each}
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]"
              >Tiempo de espera antes de la transferencia</label
            >
            <select
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 appearance-none"
              value={alarm.tiempoEspera}
              onchange={(e) =>
                updateField(alarm.id, "tiempoEspera", e.target.value)}
            >
              {#each TIEMPO_ESPERA_OPTIONS as opt}
                <option value={opt}>{opt}</option>
              {/each}
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]"
              >Contacto de red de apoyo</label
            >
            <select
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 appearance-none"
              value={alarm.contactoRed}
              onchange={(e) =>
                updateField(alarm.id, "contactoRed", e.target.value)}
            >
              {#each CONTACTO_OPTIONS as opt}
                <option value={opt}>{opt}</option>
              {/each}
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]"
              >Acción a preparar ante la transferencia</label
            >
            <select
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 appearance-none"
            >
              <option>Alarmar a preparar ante la transferencia</option>
            </select>
          </div>
        </div>

        <!-- Master + Snooze row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]">Master Activado</label>
            <select
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 appearance-none"
            >
              <option>Activado</option>
              <option>Desactivado</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]">Máximo de repeticiones</label>
            <div class="flex items-center gap-3">
              <button
                class="w-10 h-10 rounded-xl bg-[#3A2E07] border border-[#4a3d1a] text-primary-500 text-xl flex items-center justify-center hover:bg-[#4a3d1a] transition-colors"
                onclick={() => adjustSnooze(alarm.id, -1)}
              >
                −
              </button>
              <span class="text-primary-950 text-lg min-w-[3rem] text-center"
                >{alarm.maxSnooze} veces</span
              >
              <button
                class="w-10 h-10 rounded-xl bg-[#3A2E07] border border-[#4a3d1a] text-primary-500 text-xl flex items-center justify-center hover:bg-[#4a3d1a] transition-colors"
                onclick={() => adjustSnooze(alarm.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- FAB -->
  <div class="flex justify-center">
    <button
      class="w-14 h-14 rounded-full bg-primary-500 text-secondary-800 text-3xl flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
      onclick={addAlarm}
    >
      +
    </button>
  </div>
</main>
