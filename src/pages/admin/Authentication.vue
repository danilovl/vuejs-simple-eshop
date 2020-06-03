<template>
  <v-container fluid>
    <h4 class="bg-primary text-white text-center p-2">
      Administration
    </h4>
    <h4 v-if="showFailureMessage"
        class="bg-danger text-white text-center p-2 my-2">
      Authentication Failed. Please try again.
    </h4>
    <v-row justify="center">
      <form>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :counter="10"
          :label="'form.username' | transFilter"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="passwordErrors"
          :label="'form.password' | transFilter"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          required
          @click:append="showPassword = !showPassword"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        >
        </v-text-field>
        <v-btn class="mr-4" @click="handleAuth">
          {{ 'btn.login' | transFilter }}
        </v-btn>
        <v-btn @click="clear">
          {{ 'btn.clear' | transFilter }}
        </v-btn>
      </form>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { AuthModel } from '../../model/auth-model'

export default {
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
    showFailureMessage: false
  }),
  mixins: [validationMixin],
  validations: {
    username: {
      required,
      maxLength: maxLength(10)
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(10)
    }
  },
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) {
        return errors
      }
      !this.$v.username.maxLength && errors.push('Username must be at most 10 characters long')
      !this.$v.username.required && errors.push('Username is required.')

      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.minLength && errors.push('Password must be at more 4 characters long')
      !this.$v.password.maxLength && errors.push('Password must be at less 10 characters long')
      !this.$v.password.required && errors.push('Password is required')

      return errors
    }
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    async handleAuth () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const authModel = new AuthModel(this.username, this.password)
        await this.authenticate(authModel)

        if (this.isAuthenticated) {
          await this.$router.push('/admin')
        } else {
          this.showFailureMessage = true
        }
      }
    },
    clear () {
      this.$v.$reset()
      this.username = ''
      this.password = ''
    }
  }
}
</script>
