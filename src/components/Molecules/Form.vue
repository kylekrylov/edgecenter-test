<script setup>
import { computed, reactive, ref } from "vue";
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, maxLength, required, email } from "@vuelidate/validators";
import applyPhoneNumberMask from "@/mixin/phoneNumberMask";
import debounce from "@/mixin/debounce";

import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazTextarea from 'maz-ui/components/MazTextarea'

const [form] = useAutoAnimate()

const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const emailField = ref('')
const message = ref('')

const formState = {
  name: {
    firstName: '',
    lastName: '',
  },
  phone: '',
  email: '',
  message: '',
}

const rules = computed(() => ({
  firstName: {
    minLength: helpers.withMessage('Вот не похож(a) ты на азиата, минимум 3 символов', minLength(3)),
    maxLength: helpers.withMessage('Медленно убрал руки с клавиатуры, максимум 100 символов', maxLength(100)),
    alpha: helpers.withMessage('Поле должно содержать только буквы', alpha),
    required: helpers.withMessage('Обязательное для заполнения', required)
  },
  lastName: {
    minLength: helpers.withMessage('Вот не похож ты на азиата, минимум 3 символов', minLength(3)),
    maxLength: helpers.withMessage('Медленно убрал руки с клавиатуры, максимум 100 символов', maxLength(100)),
    alpha: helpers.withMessage('Поле должно содержать только буквы', alpha),
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
const alpha = (value) => /^[a-zA-Zа-яА-ЯёЁ]+$/.test(value)

const v$ = useVuelidate(rules, {firstName, message, phoneNumber, emailField}, {$lazy: true})

const submitForm = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) console.log(v$.value)
  
  formState.name.firstName = firstName.value
  formState.name.lastName = lastName.value
  formState.phone = phoneNumber.value
  formState.email = emailField.value
  formState.message = message.value
  
  console.table(formState)
}

</script>


<template>
  <form
    class="form"
    ref="form"
  >
    <div class="form__name">
      <MazInput
        v-model="v$.firstName.$model"
        label="Имя"
        :error="v$.firstName.$error"
        required
        debounce
        auto-focus
      />
      <div
        v-for="error in  v$.firstName.$errors"
        :key="error.$uid"
        class="maz-text-warning-600 text-xs"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="form__name">
      <MazInput
        v-model="v$.lastName.$model"
        label="Фамилия"
        :error="v$.lastName.$error"
      />
      <div
        v-for="error in  v$.firstName.$errors"
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
