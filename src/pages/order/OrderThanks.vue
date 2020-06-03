<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card
        class="mx-auto"
        max-width="600"
      >
        <v-card-text>
          <p class="display-1 text--primary">
            {{ 'text.thanks' | transFilter }}
          </p>
          <p>{{ 'text.thanks_for_placing' | transFilter }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ma-2"
                 outlined
                 color="indigo"
                 to="/"
          >
            {{ 'btn.return_to_store' | transFilter }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
