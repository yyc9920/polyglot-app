import type { DictionaryEntry } from '../../types/dictionary';

export const GREETINGS: DictionaryEntry[] = [
  {
    id: 'greet_hello',
    tags: ['Greeting', 'Essential'],
    translations: {
      en: { text: "Hello", pron: "Hello" },
      es: { text: "Hola", pron: "Oh-la" },
      fr: { text: "Bonjour", pron: "Bon-zhoor" },
      ja: { text: "こんにちは", pron: "Konnichiwa" },
      de: { text: "Hallo", pron: "Ha-lo" },
      ko: { text: "안녕하세요", pron: "An-nyeong-ha-se-yo" },
      it: { text: "Ciao", pron: "Chow" },
      zh: { text: "你好", pron: "Nǐ hǎo" },
      pt: { text: "Olá", pron: "Oh-lah" },
      hi: { text: "नमस्ते", pron: "Namaste" }
    }
  },
  {
    id: 'greet_good_morning',
    tags: ['Greeting'],
    translations: {
      en: { text: "Good morning", pron: "Good morning" },
      es: { text: "Buenos días", pron: "Bweh-nos dee-as" },
      fr: { text: "Bonjour", pron: "Bon-zhoor" },
      ja: { text: "おはようございます", pron: "Ohayou gozaimasu" },
      de: { text: "Guten Morgen", pron: "Goo-ten Mor-gen" },
      ko: { text: "좋은 아침입니다", pron: "Jo-eun a-chim-im-ni-da" },
      it: { text: "Buongiorno", pron: "Bwon-jor-no" },
      zh: { text: "早上好", pron: "Zǎoshang hǎo" },
      pt: { text: "Bom dia", pron: "Bom dee-ah" },
      hi: { text: "수브라바트", pron: "Su-pra-bhat" }
    }
  },
  {
    id: 'greet_good_night',
    tags: ['Greeting'],
    translations: {
      en: { text: "Good night", pron: "Good night" },
      es: { text: "Buenas noches", pron: "Bweh-nas no-ches" },
      fr: { text: "Bonne nuit", pron: "Bon nwee" },
      ja: { text: "おやすみなさい", pron: "Oyasumi nasai" },
      de: { text: "Gute Nacht", pron: "Goo-te Nakht" },
      ko: { text: "안녕히 주무세요", pron: "An-nyeong-hi ju-mu-se-yo" },
      it: { text: "Buonanotte", pron: "Bwo-na-not-te" },
      zh: { text: "晚安", pron: "Wǎn'ān" },
      pt: { text: "Boa noite", pron: "Bo-ah noy-te" },
      hi: { text: "शुभ रात्रि", pron: "Shubh raatri" }
    }
  },
  {
    id: 'greet_how_are_you',
    tags: ['Greeting'],
    translations: {
      en: { text: "How are you?", pron: "How are you?" },
      es: { text: "¿Cómo estás?", pron: "Koh-mo es-tas" },
      fr: { text: "Comment allez-vous?", pron: "Kom-man ta-lay voo" },
      ja: { text: "お元気ですか", pron: "Ogenki desu ka" },
      de: { text: "Wie geht es Ihnen?", pron: "Vee gayt es ee-nen" },
      ko: { text: "잘 지내세요?", pron: "Jal ji-nae-se-yo?" },
      it: { text: "Come stai?", pron: "Ko-me sty" },
      zh: { text: "你好吗？", pron: "Nǐ hǎo ma?" },
      pt: { text: "Como vai?", pron: "Koh-mo vye" },
      hi: { text: "आप कैसे हैं?", pron: "Aap kaise hain?" }
    }
  },
  {
    id: 'greet_nice_meet',
    tags: ['Greeting'],
    translations: {
      en: { text: "Nice to meet you", pron: "Nice to meet you" },
      es: { text: "Mucho gusto", pron: "Moo-cho goos-to" },
      fr: { text: "Enchanté", pron: "On-shon-tay" },
      ja: { text: "はじめまして", pron: "Hajimemashite" },
      de: { text: "Freut mich", pron: "Froyt mikh" },
      ko: { text: "만나서 반갑습니다", pron: "Man-na-seo ban-gap-seum-ni-da" },
      it: { text: "Piacere", pron: "Pya-che-re" },
      zh: { text: "很高兴见到你", pron: "Hěn gāoxìng jiàndào nǐ" },
      pt: { text: "Prazer em conhecê-lo", pron: "Prah-zehr em kon-nyeh-seh-lo" },
      hi: { text: "आपसे मिलकर खुशी हुई", pron: "Aapse milkar khushi hui" }
    }
  },
  {
    id: 'greet_bye',
    tags: ['Greeting'],
    translations: {
      en: { text: "Goodbye", pron: "Goodbye" },
      es: { text: "Adiós", pron: "Ah-dyos" },
      fr: { text: "Au revoir", pron: "Oh rev-war" },
      ja: { text: "さようなら", pron: "Sayounara" },
      de: { text: "Auf Wiedersehen", pron: "Ow-f vee-der-zay-en" },
      ko: { text: "안녕히 가세요", pron: "An-nyeong-hi ga-se-yo" },
      it: { text: "Arrivederci", pron: "Ah-ree-ve-der-chee" },
      zh: { text: "再见", pron: "Zàijiàn" },
      pt: { text: "Adeus", pron: "Ah-deh-oos" },
      hi: { text: "नमस्ते", pron: "Namaste" } 
    }
  },
  {
    id: 'greet_see_you',
    tags: ['Greeting'],
    translations: {
      en: { text: "See you later", pron: "See you later" },
      es: { text: "Hasta luego", pron: "Ah-sta lweh-go" },
      fr: { text: "À plus tard", pron: "Ah ploo tar" },
      ja: { text: "また会いましょう", pron: "Mata aimashou" },
      de: { text: "Bis später", pron: "Bis shpay-ter" },
      ko: { text: "나중에 봐요", pron: "Na-jung-e bwa-yo" },
      it: { text: "A dopo", pron: "Ah doh-po" },
      zh: { text: "回头见", pron: "Huítóu jiàn" },
      pt: { text: "Até logo", pron: "Ah-teh loh-go" },
      hi: { text: "बाद में मिलते हैं", pron: "Baad mein milte hain" }
    }
  },
  {
    id: 'greet_name',
    tags: ['Greeting'],
    translations: {
      en: { text: "My name is...", pron: "My name is..." },
      es: { text: "Me llamo...", pron: "Meh ya-mo..." },
      fr: { text: "Je m'appelle...", pron: "Zhuh mah-pel..." },
      ja: { text: "私の名前は...です", pron: "Watashi no namae wa...desu" },
      de: { text: "Ich heiße...", pron: "Ikh high-se..." },
      ko: { text: "제 이름은 ...입니다", pron: "Je i-reum-eun ...im-ni-da" },
      it: { text: "Mi chiamo...", pron: "Mee kya-mo..." },
      zh: { text: "我叫...", pron: "Wǒ jiào..." },
      pt: { text: "Meu nome é...", pron: "Meh-oo no-meh eh..." },
      hi: { text: "मेरा नाम ... है", pron: "Mera naam ... hai" }
    }
  },
  {
    id: 'greet_from',
    tags: ['Greeting'],
    translations: {
      en: { text: "I am from...", pron: "I am from..." },
      es: { text: "Soy de...", pron: "Soy deh..." },
      fr: { text: "Je viens de...", pron: "Zhuh vee-en deh..." },
      ja: { text: "私は...出身です", pron: "Watashi wa...shusshin desu" },
      de: { text: "Ich komme aus...", pron: "Ikh ko-me ows..." },
      ko: { text: "저는 ...에서 왔습니다", pron: "Jeo-neun ...e-seo wat-seum-ni-da" },
      it: { text: "Vengo da...", pron: "Ven-go da..." },
      zh: { text: "我来自...", pron: "Wǒ láizì..." },
      pt: { text: "Eu sou de...", pron: "Eh-oo so deh..." },
      hi: { text: "मैं ... से हूँ", pron: "Main ... se hoon" }
    }
  },
  {
    id: 'greet_welcome',
    tags: ['Greeting'],
    translations: {
      en: { text: "Welcome", pron: "Welcome" },
      es: { text: "Bienvenido", pron: "Byen-veh-nee-do" },
      fr: { text: "Bienvenue", pron: "Byen-ven-oo" },
      ja: { text: "ようこそ", pron: "Youkoso" },
      de: { text: "Willkommen", pron: "Vil-ko-men" },
      ko: { text: "환영합니다", pron: "Hwan-yeong-ham-ni-da" },
      it: { text: "Benvenuto", pron: "Ben-ve-nu-to" },
      zh: { text: "欢迎", pron: "Huānyíng" },
      pt: { text: "Bem-vindo", pron: "Ben-veen-do" },
      hi: { text: "स्वागत हे", pron: "Swagat he" }
    }
  }
];
