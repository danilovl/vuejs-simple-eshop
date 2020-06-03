import store from '../store'
import enJson from '../locale/en.json'
import ruJson from '../locale/ru.json'
import LocaleConstant from '@/constant/locale-constant'

type Locale = {
  [key: string]: string;
}

type Locales = {
  [key: string]: Locale;
}

const locales: Locales = {
  en: enJson,
  ru: ruJson
}

export default function transFilter (key: string, locale: string = LocaleConstant.EN): string {
  const chooseLocale = store.getters['locale/getLocale'] || locale

  return locales[chooseLocale][key] || `[Trans error]: key ${key} not found`
}
