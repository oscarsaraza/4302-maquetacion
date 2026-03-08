<script>
  import Nav from "$lib/components/nav.svelte";
  import TextButton from "$lib/components/text-button.svelte";

  let emailSent = $state(false);
  let email = $state("");

  function handleSend() {
    if (email.trim()) {
      emailSent = true;
    }
  }

  function handleRetry() {
    emailSent = false;
    email = "";
  }
</script>

<main class="min-h-screen flex flex-col gap-8 p-8 max-w-7xl mx-auto">
  <Nav />

  <div class="flex items-center justify-center w-full mx-auto">
    <div
      class="bg-secondary-800 w-lg rounded-3xl p-12 flex flex-col gap-8 items-center"
    >
      <!-- Phone icon -->
      <div
        class="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="#2a2415"
        >
          <path
            d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3m1 17H7V4h10zM12 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
          />
        </svg>
      </div>

      <h1 class="text-center">
        Vincular un <span class="text-primary-500">dispositivo</span>
      </h1>

      <p class="text-sm text-[#B3ACA0] text-center leading-relaxed">
        Al vincular tu dispositivo como respaldo al reloj de un amigo/a, estarás
        configurado para recibir alertas de verificación. Desde tu teléfono podrás
        monitorear el estado de las alarmas con las que tengas un vínculo directo.
      </p>

      {#if !emailSent}
        <div class="w-full flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]"
              >Envía un código parecido</label
            >
            <input
              type="email"
              bind:value={email}
              placeholder="correo@ejemplo.com"
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 w-full"
            />
          </div>
          <button
            class="bg-primary-500 text-secondary-800 font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors"
            onclick={handleSend}
          >
            Enviar código
          </button>
        </div>
      {:else}
        <div class="flex flex-col items-center gap-4">
          <div
            class="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#13ec37"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
            </svg>
          </div>
          <p class="text-primary-950 text-center">
            Código enviado a <span class="text-primary-500">{email}</span>
          </p>
        </div>
      {/if}

      <div class="text-center">
        <span class="text-xs text-[#B3ACA0]">¿No recibes el código? </span>
        <button
          class="text-xs text-primary-500 hover:text-primary-700 transition-colors"
          onclick={handleRetry}
        >
          Reintenta
        </button>
      </div>
    </div>
  </div>
</main>
