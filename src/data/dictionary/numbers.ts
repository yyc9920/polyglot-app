import type { DictionaryEntry } from '../../types/dictionary';

export const NUMBERS_AND_TIME: DictionaryEntry[] = [
  {
    id: 'num_one',
    tags: ['Numbers'],
    translations: {
      en: { text: "One", pron: "One" },
      es: { text: "Uno", pron: "Oo-no" },
      fr: { text: "Un", pron: "Un" },
      ja: { text: "一 (いち)", pron: "Ichi" },
      de: { text: "Eins", pron: "Ines" },
      ko: { text: "일", pron: "Il" },
      it: { text: "Uno", pron: "Oo-no" },
      zh: { text: "一", pron: "Yī" },
      pt: { text: "Um", pron: "Oom" },
      hi: { text: "एक", pron: "Ek" }
    }
  },
  {
    id: 'num_two',
    tags: ['Numbers'],
    translations: {
      en: { text: "Two", pron: "Two" },
      es: { text: "Dos", pron: "Dos" },
      fr: { text: "Deux", pron: "Duh" },
      ja: { text: "二 (に)", pron: "Ni" },
      de: { text: "Zwei", pron: "Tsvy" },
      ko: { text: "이", pron: "I" },
      it: { text: "Due", pron: "Doo-eh" },
      zh: { text: "二", pron: "Èr" },
      pt: { text: "Dois", pron: "Do-ees" },
      hi: { text: "दो", pron: "Do" }
    }
  },
  {
    id: 'num_three',
    tags: ['Numbers'],
    translations: {
      en: { text: "Three", pron: "Three" },
      es: { text: "Tres", pron: "Tres" },
      fr: { text: "Trois", pron: "Trwa" },
      ja: { text: "三 (さん)", pron: "San" },
      de: { text: "Drei", pron: "Dry" },
      ko: { text: "삼", pron: "Sam" },
      it: { text: "Tre", pron: "Tre" },
      zh: { text: "三", pron: "Sān" },
      pt: { text: "Três", pron: "Tress" },
      hi: { text: "तीन", pron: "Teen" }
    }
  },
  {
    id: 'time_now',
    tags: ['Time'],
    translations: {
      en: { text: "What time is it?", pron: "What time is it?" },
      es: { text: "¿Qué hora es?", pron: "Ke o-ra es" },
      fr: { text: "Quelle heure est-il?", pron: "Kel ur eh-teel" },
      ja: { text: "何時ですか", pron: "Nanji desu ka" },
      de: { text: "Wie spät ist es?", pron: "Vee shpayt ist es" },
      ko: { text: "지금 몇 시입니까?", pron: "Ji-geum myeot si-im-ni-ka" },
      it: { text: "Che ore sono?", pron: "Ke o-re so-no" },
      zh: { text: "现在几点了？", pron: "Xiànzài jǐ diǎnle?" },
      pt: { text: "Que horas são?", pron: "Ke o-ras sow" },
      hi: { text: "क्या समय हुआ है?", pron: "Kya samay hua hai?" }
    }
  },
  {
    id: 'time_today',
    tags: ['Time'],
    translations: {
      en: { text: "Today", pron: "Today" },
      es: { text: "Hoy", pron: "Oy" },
      fr: { text: "Aujourd'hui", pron: "O-zhoor-dwee" },
      ja: { text: "今日", pron: "Kyou" },
      de: { text: "Heute", pron: "Hoy-te" },
      ko: { text: "오늘", pron: "O-neul" },
      it: { text: "Oggi", pron: "Od-jee" },
      zh: { text: "今天", pron: "Jīntiān" },
      pt: { text: "Hoje", pron: "O-zhe" },
      hi: { text: "आज", pron: "Aaj" }
    }
  },
  {
    id: 'time_tomorrow',
    tags: ['Time'],
    translations: {
      en: { text: "Tomorrow", pron: "Tomorrow" },
      es: { text: "Mañana", pron: "Ma-nya-na" },
      fr: { text: "Demain", pron: "De-man" },
      ja: { text: "明日", pron: "Ashita" },
      de: { text: "Morgen", pron: "Mor-gen" },
      ko: { text: "내일", pron: "Nae-il" },
      it: { text: "Domani", pron: "Do-ma-nee" },
      zh: { text: "明天", pron: "Míngtiān" },
      pt: { text: "Amanhã", pron: "Ah-ma-nyan" },
      hi: { text: "कल (आने वाला)", pron: "Kal" }
    }
  },
  {
    id: 'time_yesterday',
    tags: ['Time'],
    translations: {
      en: { text: "Yesterday", pron: "Yesterday" },
      es: { text: "Ayer", pron: "Ah-yer" },
      fr: { text: "Hier", pron: "Yer" },
      ja: { text: "昨日", pron: "Kinou" },
      de: { text: "Gestern", pron: "Ges-tern" },
      ko: { text: "어제", pron: "Eo-je" },
      it: { text: "Ieri", pron: "Yeh-ree" },
      zh: { text: "昨天", pron: "Zuótiān" },
      pt: { text: "Ontem", pron: "On-tem" },
      hi: { text: "कल (बीता हुआ)", pron: "Kal" }
    }
  },
  {
    id: 'time_morning',
    tags: ['Time'],
    translations: {
      en: { text: "Morning", pron: "Morning" },
      es: { text: "Mañana", pron: "Ma-nya-na" },
      fr: { text: "Matin", pron: "Ma-tan" },
      ja: { text: "朝", pron: "Asa" },
      de: { text: "Morgen", pron: "Mor-gen" },
      ko: { text: "아침", pron: "A-chim" },
      it: { text: "Mattina", pron: "Mat-tee-na" },
      zh: { text: "早上", pron: "Zǎoshang" },
      pt: { text: "Manhã", pron: "Ma-nyan" },
      hi: { text: "सुबह", pron: "Subah" }
    }
  },
  {
    id: 'time_night',
    tags: ['Time'],
    translations: {
      en: { text: "Night", pron: "Night" },
      es: { text: "Noche", pron: "No-che" },
      fr: { text: "Nuit", pron: "Nwee" },
      ja: { text: "夜", pron: "Yoru" },
      de: { text: "Nacht", pron: "Nakht" },
      ko: { text: "밤", pron: "Bam" },
      it: { text: "Notte", pron: "Not-te" },
      zh: { text: "晚上", pron: "Wǎnshàng" },
      pt: { text: "Noite", pron: "Noy-te" },
      hi: { text: "रात", pron: "Raat" }
    }
  },
  {
    id: 'time_week',
    tags: ['Time'],
    translations: {
      en: { text: "Week", pron: "Week" },
      es: { text: "Semana", pron: "Se-ma-na" },
      fr: { text: "Semaine", pron: "Se-men" },
      ja: { text: "週", pron: "Shuu" },
      de: { text: "Woche", pron: "Vo-khe" },
      ko: { text: "주", pron: "Ju" },
      it: { text: "Settimana", pron: "Set-tee-ma-na" },
      zh: { text: "周", pron: "Zhōu" },
      pt: { text: "Semana", pron: "Se-ma-na" },
      hi: { text: "सप्ताह", pron: "Saptah" }
    }
  },
  {
    id: 'time_year',
    tags: ['Time'],
    translations: {
      en: { text: "Year", pron: "Year" },
      es: { text: "Año", pron: "Ah-nyo" },
      fr: { text: "Année", pron: "Ah-nay" },
      ja: { text: "年", pron: "Nen" },
      de: { text: "Jahr", pron: "Yar" },
      ko: { text: "년", pron: "Nyeon" },
      it: { text: "Anno", pron: "An-no" },
      zh: { text: "年", pron: "Nián" },
      pt: { text: "Ano", pron: "Ah-no" },
      hi: { text: "साल", pron: "Saal" }
    }
  },
  {
    id: 'time_minute',
    tags: ['Time'],
    translations: {
      en: { text: "Minute", pron: "Minute" },
      es: { text: "Minuto", pron: "Me-noo-to" },
      fr: { text: "Minute", pron: "Me-noot" },
      ja: { text: "分", pron: "Fun" },
      de: { text: "Minute", pron: "Mi-noo-te" },
      ko: { text: "분", pron: "Bun" },
      it: { text: "Minuto", pron: "Me-noo-to" },
      zh: { text: "分钟", pron: "Fēnzhōng" },
      pt: { text: "Minuto", pron: "Me-noo-to" },
      hi: { text: "मिनट", pron: "Minute" }
    }
  },
  {
    id: 'time_hour',
    tags: ['Time'],
    translations: {
      en: { text: "Hour", pron: "Hour" },
      es: { text: "Hora", pron: "O-ra" },
      fr: { text: "Heure", pron: "Ur" },
      ja: { text: "時間", pron: "Jikan" },
      de: { text: "Stunde", pron: "Shtoon-de" },
      ko: { text: "시간", pron: "Si-gan" },
      it: { text: "Ora", pron: "O-ra" },
      zh: { text: "小时", pron: "Xiǎoshí" },
      pt: { text: "Hora", pron: "O-ra" },
      hi: { text: "घंटा", pron: "Ghanta" }
    }
  },
  {
    id: 'time_later',
    tags: ['Time'],
    translations: {
      en: { text: "Later", pron: "Later" },
      es: { text: "Más tarde", pron: "Mas tar-de" },
      fr: { text: "Plus tard", pron: "Ploo tar" },
      ja: { text: "後で", pron: "Atode" },
      de: { text: "Später", pron: "Shpay-ter" },
      ko: { text: "나중에", pron: "Na-jung-e" },
      it: { text: "Più tardi", pron: "Pyoo tar-dee" },
      zh: { text: "稍后", pron: "Shāohòu" },
      pt: { text: "Mais tarde", pron: "Mays tar-deh" },
      hi: { text: "बाद में", pron: "Baad mein" }
    }
  },
  {
    id: 'time_soon',
    tags: ['Time'],
    translations: {
      en: { text: "Soon", pron: "Soon" },
      es: { text: "Pronto", pron: "Pron-to" },
      fr: { text: "Bientôt", pron: "Byen-to" },
      ja: { text: "すぐに", pron: "Sugu ni" },
      de: { text: "Bald", pron: "Balt" },
      ko: { text: "곧", pron: "Got" },
      it: { text: "Presto", pron: "Pres-to" },
      zh: { text: "不久", pron: "Bùjiǔ" },
      pt: { text: "Em breve", pron: "Em bre-veh" },
      hi: { text: "जल्द ही", pron: "Jald hi" }
    }
  }
];
