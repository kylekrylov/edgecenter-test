<script setup>
import { computed, onMounted, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength, required, email } from "@vuelidate/validators";
import applyPhoneNumberMask from "@/mixin/phoneNumberMask";

import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazTextarea from 'maz-ui/components/MazTextarea'

import { useAutoAnimate } from '@formkit/auto-animate/vue'
const [form] = useAutoAnimate()

const nameField = ref('')
const phoneNumber = ref('')
const emailField = ref('')
const message = ref('')

const formState = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const rules = computed(() => ({
  nameField: {
    maxLength: helpers.withMessage('Медленно убрал руки с клавиатуры, максимум 100 символов', maxLength(100)),
    alpha: helpers.withMessage('Поле должно содержать только буквы', alpha),
    required: helpers.withMessage('Обязательное для заполнения', required)
  },
  phoneNumber: {
    minLength: helpers.withMessage('Мало цифр', minLength(18)),
    required: helpers.withMessage('Обязательное для заполнения', required)
  },
  emailField: {
    email: helpers.withMessage('Это... не похоже на email', email),
    mustBeRu: helpers.withMessage('По закону теперь только почты с окончанием на ".ru"', mustBeRu),
    required: helpers.withMessage('Обязательное для заполнения', required)
  },
  
  message: {
    minLength: minLength(1),
    maxLength: helpers.withMessage('Много воды, максимум 500 символов', maxLength(500))
  }
}))

const phoneNumberMask = () => phoneNumber.value = applyPhoneNumberMask(phoneNumber.value)

const mustBeRu = (value) => value.endsWith('.ru')
const alpha = (value) => /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)

const v$ = useVuelidate(rules, {nameField, emailField, phoneNumber, message})

const submitForm = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) console.table(formState)
  alert("Форма типа отправлена, см в console")
}
onMounted(()=>{
  if (localStorage.getItem('formState')) {
    const savedFormState = JSON.parse(localStorage.getItem('formState'))
    
    nameField.value = savedFormState.name
    emailField.value = savedFormState.email
    phoneNumber.value = savedFormState.phone
    message.value = savedFormState.message
  }
})

watch([nameField, emailField, phoneNumber, message], () => {
  formState.name = nameField.value.trim()
  formState.email = emailField.value.trim()
  formState.phone = phoneNumber.value.trim()
  formState.message = message.value.trim()
  
  localStorage.setItem('formState', JSON.stringify(formState))
})

</script>

<template>
  <form
    class="form"
    ref="form"
  >
    <div class="form__name">
      <MazInput
        v-model="v$.nameField.$model"
        label="ФОИ"
        :error="v$.nameField.$error"
        required
        debounce
        auto-focus
      />
      <div
        v-for="error in  v$.nameField.$errors"
        :key="error.$uid"
        class="maz-text-warning-600 text-xs"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="form__tel">
      <MazInput
        v-model="v$.phoneNumber.$model"
        label="Телефон"
        :error="v$.phoneNumber.$error"
        required
        @input="phoneNumberMask"
      />
      <div
        v-for="error in  v$.phoneNumber.$errors"
        :key="error.$uid"
        class="maz-text-warning-600 text-xs"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="form__email">
      <MazInput
        v-model="v$.emailField.$model"
        label="Почта"
        :error="v$.emailField.$error"
        required
        debounce
      />
      <div
        v-for="error in  v$.emailField.$errors"
        :key="error.$uid"
        class="maz-text-warning-600 text-xs"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="form__message">
      <MazTextarea
        v-model="v$.message.$model"
        name="Сообщение"
        id="comment"
        label="Сообщение"
        :error="v$.message.$error"
        debounce
      />
      <div
        v-for="error in v$.message.$errors"
        :key="error.$uid"
        class="maz-text-warning-600 text-xs"
      >
        {{ error.$message }}
      </div>
    </div>
    <MazBtn
      class="form__submit"
      @click="submitForm"
    >
      Отправить
    </MazBtn>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: grid;
  grid-gap: 16px;
  
  // .form__submit
  &__submit {
    justify-self: end;
  }
}
</style>
