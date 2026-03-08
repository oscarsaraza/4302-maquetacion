<script>
  import Nav from "$lib/components/nav.svelte";

  let contacts = $state([
    { id: 1, name: "Sarah Jerónimo", phone: "+1 (555) 123-01" },
    { id: 2, name: "Sarah Jerónimo", phone: "+1 (555) 123-01" },
    { id: 3, name: "Sarah Jerónimo", phone: "+1 (555) 123-01" },
  ]);

  let showForm = $state(false);
  let newName = $state("");
  let newPhone = $state("");

  function handleAdd() {
    if (newName.trim() && newPhone.trim()) {
      contacts = [
        ...contacts,
        { id: Date.now(), name: newName.trim(), phone: newPhone.trim() },
      ];
      newName = "";
      newPhone = "";
      showForm = false;
    }
  }

  function handleCancel() {
    newName = "";
    newPhone = "";
    showForm = false;
  }

  function handleDelete(id) {
    contacts = contacts.filter((c) => c.id !== id);
  }
</script>

<main class="min-h-screen flex flex-col gap-8 p-8 max-w-7xl mx-auto">
  <Nav />

  {#if showForm}
    <!-- Add contact form -->
    <div class="flex items-center justify-center w-full mx-auto">
      <div
        class="bg-secondary-800 w-lg rounded-3xl p-12 flex flex-col gap-8 items-center"
      >
        <!-- WiFi icon -->
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
              d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9m8 8l3 3l3-3a4.237 4.237 0 0 0-6 0m-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13"
            />
          </svg>
        </div>

        <h1 class="text-center">
          Agregar un <span class="text-primary-500">contacto</span> de apoyo
        </h1>

        <p class="text-sm text-[#B3ACA0] text-center leading-relaxed">
          ¿A quién deberíamos llamar si no despiertas?
          Contactaremos con ellos si fallas tus alarmas críticas.
        </p>

        <div class="w-full flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]"
              >Nombre del nuevo contacto</label
            >
            <input
              type="text"
              bind:value={newName}
              placeholder="Ej: María García López"
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 w-full placeholder:text-[#6b6354]"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-[#B3ACA0]">Número de teléfono</label>
            <input
              type="tel"
              bind:value={newPhone}
              placeholder="Ej: +1 (555) 000-00"
              class="bg-[#3A2E07] text-primary-950 text-sm rounded-xl px-4 py-3 border border-[#4a3d1a] focus:outline-none focus:border-primary-500 w-full placeholder:text-[#6b6354]"
            />
          </div>
        </div>

        <p class="text-xs text-[#B3ACA0] text-center leading-relaxed">
          Tu nuevo contacto recibirá un mensaje con la solicitud de vincularse como tu
          contacto de apoyo. Una vez aprobada, tu contacto estará disponible en la
          sección de configuración de reglas de respaldo.
        </p>

        <div class="flex gap-4 w-full">
          <button
            class="flex-1 text-[#B3ACA0] font-medium py-3 rounded-xl border border-[#4a3d1a] hover:border-primary-500 transition-colors"
            onclick={handleCancel}
          >
            Cancelar
          </button>
          <button
            class="flex-1 bg-primary-500 text-secondary-800 font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors"
            onclick={handleAdd}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  {:else}
    <!-- Contact list -->
    <div class="flex items-center justify-start gap-4">
      <!-- Phone icon -->
      <div
        class="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#2a2415"
        >
          <path
            d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3m1 17H7V4h10zM12 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
          />
        </svg>
      </div>
      <div>
        <h1>
          Lista de <span class="text-primary-500">Contactos</span> de respaldo
        </h1>
        <p class="text-sm text-[#B3ACA0] mt-1">
          Esta es la lista de contactos que podrán detectar tus alarmas de respaldo
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      {#each contacts as contact (contact.id)}
        <div
          class="bg-secondary-800 rounded-2xl px-8 py-5 flex items-center justify-between"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-secondary-800 font-bold text-sm"
            >
              {contact.name.charAt(0)}
            </div>
            <div>
              <p class="text-primary-950 font-medium">{contact.name}</p>
              <p class="text-sm text-[#B3ACA0]">{contact.phone}</p>
            </div>
          </div>
          <button
            class="text-danger text-sm font-medium hover:text-red-300 transition-colors"
            onclick={() => handleDelete(contact.id)}
          >
            Eliminar
          </button>
        </div>
      {/each}
    </div>

    <!-- FAB -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2">
      <button
        class="w-14 h-14 rounded-full bg-primary-500 text-secondary-800 text-3xl flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
        onclick={() => (showForm = true)}
      >
        +
      </button>
    </div>
  {/if}
</main>
