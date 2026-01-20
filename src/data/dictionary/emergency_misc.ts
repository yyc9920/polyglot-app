import type { DictionaryEntry } from '../../types/dictionary';

export const EMERGENCY_AND_MISC: DictionaryEntry[] = [
  {
    id: 'emg_police',
    tags: ['Emergency'],
    translations: {
      en: { text: "Police", pron: "Police" },
      es: { text: "Policía", pron: "Po-lee-see-ah" },
      fr: { text: "Police", pron: "Po-lees" },
      ja: { text: "警察", pron: "Keisatsu" },
      de: { text: "Polizei", pron: "Po-lee-tsy" },
      ko: { text: "경찰", pron: "Gyeong-chal" },
      it: { text: "Polizia", pron: "Po-lee-tsya" },
      zh: { text: "警察", pron: "Jǐngchá" },
      pt: { text: "Polícia", pron: "Po-lee-sya" },
      hi: { text: "पुलिस", pron: "Police" }
    }
  },
  {
    id: 'emg_doctor',
    tags: ['Emergency', 'Health'],
    translations: {
      en: { text: "Doctor", pron: "Doctor" },
      es: { text: "Médico", pron: "Me-dee-ko" },
      fr: { text: "Médecin", pron: "Med-san" },
      ja: { text: "医者", pron: "Isha" },
      de: { text: "Arzt", pron: "Artst" },
      ko: { text: "의사", pron: "Ui-sa" },
      it: { text: "Dottore", pron: "Dot-to-re" },
      zh: { text: "医生", pron: "Yīshēng" },
      pt: { text: "Médico", pron: "Meh-dee-ko" },
      hi: { text: "डॉक्टर", pron: "Doctor" }
    }
  },
  {
    id: 'emg_hospital',
    tags: ['Emergency', 'Health'],
    translations: {
      en: { text: "Hospital", pron: "Hospital" },
      es: { text: "Hospital", pron: "Os-pee-tal" },
      fr: { text: "Hôpital", pron: "O-pee-tal" },
      ja: { text: "病院", pron: "Byouin" },
      de: { text: "Krankenhaus", pron: "Kran-ken-hows" },
      ko: { text: "병원", pron: "Byeong-won" },
      it: { text: "Ospedale", pron: "Os-pe-da-le" },
      zh: { text: "医院", pron: "Yīyuàn" },
      pt: { text: "Hospital", pron: "Os-pee-tal" },
      hi: { text: "अस्पताल", pron: "Aspataal" }
    }
  },
  {
    id: 'emg_pain',
    tags: ['Emergency', 'Health'],
    translations: {
      en: { text: "I am in pain", pron: "I am in pain" },
      es: { text: "Tengo dolor", pron: "Ten-go do-lor" },
      fr: { text: "J'ai mal", pron: "Zhay mal" },
      ja: { text: "痛いです", pron: "Itai desu" },
      de: { text: "Ich habe Schmerzen", pron: "Ikh ha-be shmer-tsen" },
      ko: { text: "아픕니다", pron: "A-peum-ni-da" },
      it: { text: "Ho dolore", pron: "O do-lo-re" },
      zh: { text: "我很痛", pron: "Wǒ hěn tòng" },
      pt: { text: "Estou com dor", pron: "Es-toh kom dor" },
      hi: { text: "मुझे दर्द हो रहा है", pron: "Mujhe dard ho raha hai" }
    }
  },
  {
    id: 'emg_pharmacy',
    tags: ['Health'],
    translations: {
      en: { text: "Pharmacy", pron: "Pharmacy" },
      es: { text: "Farmacia", pron: "Far-ma-sya" },
      fr: { text: "Pharmacie", pron: "Far-ma-see" },
      ja: { text: "薬局", pron: "Yakkyoku" },
      de: { text: "Apotheke", pron: "A-po-tay-ke" },
      ko: { text: "약국", pron: "Yak-guk" },
      it: { text: "Farmacia", pron: "Far-ma-cha" },
      zh: { text: "药房", pron: "Yàofáng" },
      pt: { text: "Farmácia", pron: "Far-ma-sya" },
      hi: { text: "दवा की दुकान", pron: "Dava ki dukan" }
    }
  },
  {
    id: 'emg_lost',
    tags: ['Emergency', 'Travel'],
    translations: {
      en: { text: "I am lost", pron: "I am lost" },
      es: { text: "Estoy perdido", pron: "Es-toy per-dee-do" },
      fr: { text: "Je suis perdu", pron: "Zhuh swee per-doo" },
      ja: { text: "迷子になりました", pron: "Maigo ni narimashita" },
      de: { text: "Ich habe mich verirrt", pron: "Ikh ha-be mikh fe-rirt" },
      ko: { text: "길을 잃었습니다", pron: "Gil-eul ir-eot-seum-ni-da" },
      it: { text: "Mi sono perso", pron: "Mee so-no per-so" },
      zh: { text: "我迷路了", pron: "Wǒ mílùle" },
      pt: { text: "Estou perdido", pron: "Es-toh per-dee-do" },
      hi: { text: "मैं खो गया हूँ", pron: "Main kho gaya hoon" }
    }
  },
  {
    id: 'emg_passport',
    tags: ['Travel', 'Emergency'],
    translations: {
      en: { text: "Passport", pron: "Passport" },
      es: { text: "Pasaporte", pron: "Pa-sa-por-te" },
      fr: { text: "Passeport", pron: "Pas-por" },
      ja: { text: "パスポート", pron: "Pasupooto" },
      de: { text: "Reisepass", pron: "Ry-ze-pas" },
      ko: { text: "여권", pron: "Yeo-gwon" },
      it: { text: "Passaporto", pron: "Pas-sa-por-to" },
      zh: { text: "护照", pron: "Hùzhào" },
      pt: { text: "Passaporte", pron: "Pa-sa-por-te" },
      hi: { text: "पासपोर्ट", pron: "Passport" }
    }
  },
  {
    id: 'emg_embassy',
    tags: ['Travel', 'Emergency'],
    translations: {
      en: { text: "Embassy", pron: "Embassy" },
      es: { text: "Embajada", pron: "Em-ba-ha-da" },
      fr: { text: "Ambassade", pron: "Om-ba-sad" },
      ja: { text: "大使館", pron: "Taishikan" },
      de: { text: "Botschaft", pron: "Bot-shaft" },
      ko: { text: "대사관", pron: "Dae-sa-gwan" },
      it: { text: "Ambasciata", pron: "Am-ba-sha-ta" },
      zh: { text: "大使馆", pron: "Dàshǐ guǎn" },
      pt: { text: "Embaixada", pron: "Em-by-sha-da" },
      hi: { text: "दूतावास", pron: "Dootaavaas" }
    }
  },
  {
    id: 'misc_wifi',
    tags: ['Travel', 'Misc'],
    translations: {
      en: { text: "Do you have Wi-Fi?", pron: "Do you have Wi-Fi?" },
      es: { text: "¿Tiene Wi-Fi?", pron: "Tye-ne Wi-Fi" },
      fr: { text: "Avez-vous le Wi-Fi?", pron: "Ah-vay voo luh Wi-Fi" },
      ja: { text: "Wi-Fiはありますか", pron: "Wi-Fi wa arimasu ka" },
      de: { text: "Haben Sie WLAN?", pron: "Ha-ben zee WLAN" },
      ko: { text: "와이파이 있습니까?", pron: "Wi-Fi it-seum-ni-ka" },
      it: { text: "Avete il Wi-Fi?", pron: "Ah-ve-te il Wi-Fi" },
      zh: { text: "有Wi-Fi吗？", pron: "Yǒu Wi-Fi ma?" },
      pt: { text: "Tem Wi-Fi?", pron: "Tem Wi-Fi" },
      hi: { text: "क्या आपके पास वाई-फाई है?", pron: "Kya aapke paas Wi-Fi hai?" }
    }
  },
  {
    id: 'misc_password',
    tags: ['Misc'],
    translations: {
      en: { text: "What is the password?", pron: "What is the password?" },
      es: { text: "¿Cuál es la contraseña?", pron: "Kwal es la kon-tra-se-nya" },
      fr: { text: "Quel est le mot de passe?", pron: "Kel ay luh mo duh pas" },
      ja: { text: "パスワードは何ですか", pron: "Pasuwaado wa nan desu ka" },
      de: { text: "Wie ist das Passwort?", pron: "Vee ist das pas-vort" },
      ko: { text: "비밀번호가 무엇입니까?", pron: "Bi-mil-beon-ho-ga mu-eo-sim-ni-ka" },
      it: { text: "Qual è la password?", pron: "Kwal e la pas-word" },
      zh: { text: "密码是什么？", pron: "Mìmǎ shì shénme?" },
      pt: { text: "Qual é a senha?", pron: "Kwal eh a se-nya" },
      hi: { text: "पासवर्ड क्या है?", pron: "Password kya hai?" }
    }
  },
  {
    id: 'misc_charge',
    tags: ['Misc'],
    translations: {
      en: { text: "Can I charge my phone?", pron: "Can I charge my phone?" },
      es: { text: "¿Puedo cargar mi teléfono?", pron: "Pwe-do kar-gar mee te-le-fo-no" },
      fr: { text: "Puis-je charger mon téléphone?", pron: "Pwee zhuh shar-zhay mon te-le-fon" },
      ja: { text: "携帯を充電してもいいですか", pron: "Keitai o juuden shitemo ii desu ka" },
      de: { text: "Kann ich mein Handy aufladen?", pron: "Kan ikh mine hen-dee owf-la-den" },
      ko: { text: "휴대폰 충전할 수 있습니까?", pron: "Hyu-dae-pon chung-jeon-hal su it-seum-ni-ka" },
      it: { text: "Posso caricare il telefono?", pron: "Pos-so ka-ree-ka-re il te-le-fo-no" },
      zh: { text: "我可以给手机充电吗？", pron: "Wǒ kěyǐ gěi shǒujī chōngdiàn ma?" },
      pt: { text: "Posso carregar meu celular?", pron: "Po-so ka-rre-gar meh-oo se-loo-lar" },
      hi: { text: "क्या मैं अपना फोन चार्ज कर सकता हूँ?", pron: "Kya main apna phone charge kar sakta hoon?" }
    }
  },
  {
    id: 'misc_photo',
    tags: ['Misc'],
    translations: {
      en: { text: "Can you take a photo?", pron: "Can you take a photo?" },
      es: { text: "¿Puede tomar una foto?", pron: "Pwe-de to-mar oo-na fo-to" },
      fr: { text: "Pouvez-vous prendre une photo?", pron: "Poo-vay voo prondr oon fo-to" },
      ja: { text: "写真を撮ってもらえませんか", pron: "Shashin o totte moraemasen ka" },
      de: { text: "Können Sie ein Foto machen?", pron: "Ke-nen zee ine fo-to ma-khen" },
      ko: { text: "사진 좀 찍어주시겠습니까?", pron: "Sa-jin jom jji-geo-ju-si-get-seum-ni-ka" },
      it: { text: "Può fare una foto?", pron: "Pwo fa-re oo-na fo-to" },
      zh: { text: "能帮我拍张照吗？", pron: "Néng bāng wǒ pāi zhāng zhào ma?" },
      pt: { text: "Pode tirar uma foto?", pron: "Po-deh tee-rar oo-ma fo-to" },
      hi: { text: "क्या आप एक फोटो ले सकते हैं?", pron: "Kya aap ek photo le sakte hain?" }
    }
  },
  {
    id: 'misc_good',
    tags: ['Misc', 'Opinion'],
    translations: {
      en: { text: "Good", pron: "Good" },
      es: { text: "Bueno", pron: "Bweh-no" },
      fr: { text: "Bien", pron: "Byen" },
      ja: { text: "良い", pron: "Yoi" },
      de: { text: "Gut", pron: "Goot" },
      ko: { text: "좋아요", pron: "Jo-a-yo" },
      it: { text: "Bene", pron: "Be-ne" },
      zh: { text: "好", pron: "Hǎo" },
      pt: { text: "Bom", pron: "Bom" },
      hi: { text: "अच्छा", pron: "Achha" }
    }
  },
  {
    id: 'misc_bad',
    tags: ['Misc', 'Opinion'],
    translations: {
      en: { text: "Bad", pron: "Bad" },
      es: { text: "Malo", pron: "Ma-lo" },
      fr: { text: "Mauvais", pron: "Mo-vay" },
      ja: { text: "悪い", pron: "Warui" },
      de: { text: "Schlecht", pron: "Shlekht" },
      ko: { text: "나빠요", pron: "Na-ppa-yo" },
      it: { text: "Male", pron: "Ma-le" },
      zh: { text: "坏", pron: "Huài" },
      pt: { text: "Ruim", pron: "Roo-eem" },
      hi: { text: "बुरा", pron: "Bura" }
    }
  },
  {
    id: 'misc_love',
    tags: ['Misc', 'Social'],
    translations: {
      en: { text: "I love you", pron: "I love you" },
      es: { text: "Te quiero", pron: "Te kye-ro" },
      fr: { text: "Je t'aime", pron: "Zhuh tem" },
      ja: { text: "愛しています", pron: "Aishiteimasu" },
      de: { text: "Ich liebe dich", pron: "Ikh lee-be dikh" },
      ko: { text: "사랑합니다", pron: "Sa-rang-ham-ni-da" },
      it: { text: "Ti amo", pron: "Tee ah-mo" },
      zh: { text: "我爱你", pron: "Wǒ ài nǐ" },
      pt: { text: "Eu te amo", pron: "Eh-oo teh ah-mo" },
      hi: { text: "मैं तुमसे प्यार करता हूँ", pron: "Main tumse pyaar karta hoon" }
    }
  }
];
