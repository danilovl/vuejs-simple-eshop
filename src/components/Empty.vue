<template>
  <v-row class="mb-6"
         justify="center"
         no-gutters
  >
    <v-banner two-line>
      <v-avatar
        slot="icon"
        color="deep-purple accent-4"
        size="150"
      >
        <v-icon color="white">
          mdi-delete-empty
        </v-icon>
      </v-avatar>
      {{ 'text.empty' | transFilter }}
    </v-banner>
  </v-row>
</template>
