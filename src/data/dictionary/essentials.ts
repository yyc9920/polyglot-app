import type { DictionaryEntry } from '../../types/dictionary';

export const ESSENTIALS: DictionaryEntry[] = [
  {
    id: 'ess_yes',
    tags: ['Essential'],
    translations: {
      en: { text: "Yes", pron: "Yes" },
      es: { text: "Sí", pron: "See" },
      fr: { text: "Oui", pron: "Wee" },
      ja: { text: "はい", pron: "Hai" },
      de: { text: "Ja", pron: "Ya" },
      ko: { text: "네", pron: "Ne" },
      it: { text: "Sì", pron: "See" },
      zh: { text: "是", pron: "Shì" },
      pt: { text: "Sim", pron: "Seem" },
      hi: { text: "हाँ", pron: "Haan" }
    }
  },
  {
    id: 'ess_no',
    tags: ['Essential'],
    translations: {
      en: { text: "No", pron: "No" },
      es: { text: "No", pron: "No" },
      fr: { text: "Non", pron: "Non" },
      ja: { text: "いいえ", pron: "Iie" },
      de: { text: "Nein", pron: "Nine" },
      ko: { text: "아니요", pron: "A-ni-yo" },
      it: { text: "No", pron: "No" },
      zh: { text: "不", pron: "Bù" },
      pt: { text: "Não", pron: "Now" },
      hi: { text: "नहीं", pron: "Nahin" }
    }
  },
  {
    id: 'ess_thank_you',
    tags: ['Essential'],
    translations: {
      en: { text: "Thank you", pron: "Thank you" },
      es: { text: "Gracias", pron: "Gra-syas" },
      fr: { text: "Merci", pron: "Mehr-see" },
      ja: { text: "ありがとうございます", pron: "Arigatou gozaimasu" },
      de: { text: "Danke", pron: "Dan-ke" },
      ko: { text: "감사합니다", pron: "Gam-sa-ham-ni-da" },
      it: { text: "Grazie", pron: "Gra-tsye" },
      zh: { text: "谢谢", pron: "Xièxiè" },
      pt: { text: "Obrigado", pron: "Oh-bree-gah-do" },
      hi: { text: "धन्यवाद", pron: "Dhanyavaad" }
    }
  },
  {
    id: 'ess_please',
    tags: ['Essential'],
    translations: {
      en: { text: "Please", pron: "Please" },
      es: { text: "Por favor", pron: "Por fa-vor" },
      fr: { text: "S'il vous plaît", pron: "Seel voo play" },
      ja: { text: "お願いします", pron: "Onegaishimasu" },
      de: { text: "Bitte", pron: "Bi-te" },
      ko: { text: "부탁합니다", pron: "Bu-tak-ham-ni-da" },
      it: { text: "Per favore", pron: "Per fa-vo-re" },
      zh: { text: "请", pron: "Qǐng" },
      pt: { text: "Por favor", pron: "Por fa-vor" },
      hi: { text: "कृपया", pron: "Kripaya" }
    }
  },
  {
    id: 'ess_sorry',
    tags: ['Essential'],
    translations: {
      en: { text: "I am sorry", pron: "I am sorry" },
      es: { text: "Lo siento", pron: "Lo syen-to" },
      fr: { text: "Désolé", pron: "De-zo-lay" },
      ja: { text: "ごめんなさい", pron: "Gomen nasai" },
      de: { text: "Es tut mir leid", pron: "Es toot meer light" },
      ko: { text: "미안합니다", pron: "Mi-an-ham-ni-da" },
      it: { text: "Mi dispiace", pron: "Mee dis-pya-che" },
      zh: { text: "对不起", pron: "Duìbùqǐ" },
      pt: { text: "Desculpe", pron: "Des-kool-peh" },
      hi: { text: "क्षमा करें", pron: "Kshama karen" }
    }
  },
  {
    id: 'ess_excuse',
    tags: ['Essential'],
    translations: {
      en: { text: "Excuse me", pron: "Excuse me" },
      es: { text: "Disculpe", pron: "Dis-kool-peh" },
      fr: { text: "Excusez-moi", pron: "Ex-kew-zay mwa" },
      ja: { text: "すみません", pron: "Sumimasen" },
      de: { text: "Entschuldigung", pron: "Ent-shool-di-goong" },
      ko: { text: "실례합니다", pron: "Sil-lye-ham-ni-da" },
      it: { text: "Mi scusi", pron: "Mee skoo-zee" },
      zh: { text: "打扰一下", pron: "Dǎrǎo yīxià" },
      pt: { text: "Com licença", pron: "Kom lee-sen-sah" },
      hi: { text: "माफ़ कीजिये", pron: "Maaf kijiye" }
    }
  },
  {
    id: 'ess_help',
    tags: ['Essential', 'Emergency'],
    translations: {
      en: { text: "Help me", pron: "Help me" },
      es: { text: "Ayúdadme", pron: "Ah-yoo-dad-meh" },
      fr: { text: "Aidez-moi", pron: "Ay-day mwa" },
      ja: { text: "助けてください", pron: "Tasukete kudasai" },
      de: { text: "Hilf mir", pron: "Hilf meer" },
      ko: { text: "도와주세요", pron: "Do-wa-ju-se-yo" },
      it: { text: "Aiutami", pron: "Ah-yoo-ta-mee" },
      zh: { text: "救命", pron: "Jiùmìng" },
      pt: { text: "Ajude-me", pron: "Ah-joo-deh meh" },
      hi: { text: "मेरी मदद करो", pron: "Meri madad karo" }
    }
  },
  {
    id: 'ess_dont_know',
    tags: ['Essential'],
    translations: {
      en: { text: "I don't know", pron: "I don't know" },
      es: { text: "No lo sé", pron: "No lo seh" },
      fr: { text: "Je ne sais pas", pron: "Zhuh nuh say pah" },
      ja: { text: "わかりません", pron: "Wakarimasen" },
      de: { text: "Ich weiß nicht", pron: "Ikh vise nikht" },
      ko: { text: "모르겠습니다", pron: "Mo-reu-get-seum-ni-da" },
      it: { text: "Non lo so", pron: "Non lo so" },
      zh: { text: "我不知道", pron: "Wǒ bù zhīdào" },
      pt: { text: "Eu não sei", pron: "Eh-oo now say" },
      hi: { text: "मुझे नहीं पता", pron: "Mujhe nahin pata" }
    }
  },
  {
    id: 'ess_understand',
    tags: ['Essential'],
    translations: {
      en: { text: "I understand", pron: "I understand" },
      es: { text: "Entiendo", pron: "En-tyen-do" },
      fr: { text: "Je comprends", pron: "Zhuh kom-pron" },
      ja: { text: "わかります", pron: "Wakarimasu" },
      de: { text: "Ich verstehe", pron: "Ikh fer-shtay-e" },
      ko: { text: "알겠습니다", pron: "Al-get-seum-ni-da" },
      it: { text: "Capisco", pron: "Ka-pees-ko" },
      zh: { text: "我明白了", pron: "Wǒ míngbáile" },
      pt: { text: "Eu entendo", pron: "Eh-oo en-ten-do" },
      hi: { text: "मैं समझता हूँ", pron: "Main samajhta hoon" }
    }
  },
  {
    id: 'ess_no_understand',
    tags: ['Essential'],
    translations: {
      en: { text: "I don't understand", pron: "I don't understand" },
      es: { text: "No entiendo", pron: "No en-tyen-do" },
      fr: { text: "Je ne comprends pas", pron: "Zhuh nuh kom-pron pah" },
      ja: { text: "わかりません", pron: "Wakarimasen" },
      de: { text: "Ich verstehe nicht", pron: "Ikh fer-shtay-e nikht" },
      ko: { text: "이해가 안 됩니다", pron: "I-hae-ga an doem-ni-da" },
      it: { text: "Non capisco", pron: "Non ka-pees-ko" },
      zh: { text: "我不明白", pron: "Wǒ bù míngbái" },
      pt: { text: "Eu não entendo", pron: "Eh-oo now en-ten-do" },
      hi: { text: "मुझे समझ नहीं आया", pron: "Mujhe samajh nahin aaya" }
    }
  },
  {
    id: 'ess_speak_eng',
    tags: ['Essential'],
    translations: {
      en: { text: "Do you speak English?", pron: "Do you speak English?" },
      es: { text: "¿Hablas inglés?", pron: "Ah-blas in-gles" },
      fr: { text: "Parlez-vous anglais?", pron: "Par-lay voo ong-glay" },
      ja: { text: "英語を話せますか", pron: "Eigo o hanasemasu ka" },
      de: { text: "Sprechen Sie Englisch?", pron: "Shpre-khen zee eng-lish" },
      ko: { text: "영어를 할 수 있습니까?", pron: "Yeong-eo-reul hal su it-seum-ni-ka" },
      it: { text: "Parli inglese?", pron: "Par-lee in-gle-ze" },
      zh: { text: "你会说英语吗？", pron: "Nǐ huì shuō yīngyǔ ma?" },
      pt: { text: "Você fala inglês?", pron: "Vo-seh fa-la in-gles" },
      hi: { text: "क्या आप अंग्रेज़ी बोलते हैं?", pron: "Kya aap angrezi bolte hain?" }
    }
  },
  {
    id: 'ess_slowly',
    tags: ['Essential'],
    translations: {
      en: { text: "Please speak slowly", pron: "Please speak slowly" },
      es: { text: "Hable despacio, por favor", pron: "Ah-ble des-pa-syo, por fa-vor" },
      fr: { text: "Parlez lentement s'il vous plaît", pron: "Par-lay lon-te-mon seel voo play" },
      ja: { text: "ゆっくり話してください", pron: "Yukkuri hanashite kudasai" },
      de: { text: "Bitte sprechen Sie langsam", pron: "Bi-te shpre-khen zee lang-zam" },
      ko: { text: "천천히 말해주세요", pron: "Cheon-cheon-hi mal-hae-ju-se-yo" },
      it: { text: "Parli lentamente per favore", pron: "Par-lee len-ta-men-te per fa-vo-re" },
      zh: { text: "请说慢一点", pron: "Qǐng shuō màn yīdiǎn" },
      pt: { text: "Fale devagar, por favor", pron: "Fa-leh de-va-gar, por fa-vor" },
      hi: { text: "कृपया धीरे बोलें", pron: "Kripaya dheere bolen" }
    }
  },
  {
    id: 'ess_okay',
    tags: ['Essential'],
    translations: {
      en: { text: "Okay", pron: "Okay" },
      es: { text: "Está bien", pron: "Es-ta byen" },
      fr: { text: "D'accord", pron: "Da-kor" },
      ja: { text: "大丈夫です", pron: "Daijoubu desu" },
      de: { text: "In Ordnung", pron: "In ord-noong" },
      ko: { text: "좋습니다", pron: "Jo-seum-ni-da" },
      it: { text: "Va bene", pron: "Va be-ne" },
      zh: { text: "好的", pron: "Hǎo de" },
      pt: { text: "Está bem", pron: "Es-tah bem" },
      hi: { text: "ठीक है", pron: "Theek hai" }
    }
  },
  {
    id: 'ess_right',
    tags: ['Essential'],
    translations: {
      en: { text: "That is right", pron: "That is right" },
      es: { text: "Es correcto", pron: "Es ko-rek-to" },
      fr: { text: "C'est exact", pron: "Say eg-zakt" },
      ja: { text: "その通りです", pron: "Sono toori desu" },
      de: { text: "Das stimmt", pron: "Das shtimt" },
      ko: { text: "맞습니다", pron: "Mat-seum-ni-da" },
      it: { text: "È giusto", pron: "E jus-to" },
      zh: { text: "那是对的", pron: "Nà shì duì de" },
      pt: { text: "Está certo", pron: "Es-tah sehr-to" },
      hi: { text: "वह सही है", pron: "Vah sahi hai" }
    }
  },
  {
    id: 'ess_wrong',
    tags: ['Essential'],
    translations: {
      en: { text: "That is wrong", pron: "That is wrong" },
      es: { text: "Está mal", pron: "Es-ta mal" },
      fr: { text: "C'est faux", pron: "Say fo" },
      ja: { text: "違います", pron: "Chigaimasu" },
      de: { text: "Das ist falsch", pron: "Das ist falsh" },
      ko: { text: "틀렸습니다", pron: "Teul-lyeot-seum-ni-da" },
      it: { text: "È sbagliato", pron: "E zba-lya-to" },
      zh: { text: "那是错的", pron: "Nà shì cuò de" },
      pt: { text: "Está errado", pron: "Es-tah eh-rra-do" },
      hi: { text: "वह गलत है", pron: "Vah galat hai" }
    }
  }
];
