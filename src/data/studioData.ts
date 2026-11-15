import heroBackTattoo from '../assets/images/hero_back_tattoo_1794753204768.jpg';
import conceptJokerPortrait from '../assets/images/concept_joker_portrait_1794753204637.jpg';
import gallerySpineFineline from '../assets/images/gallery_spine_fineline_1794753205902.jpg';
import galleryGothicSleeve from '../assets/images/gallery_gothic_sleeve_1794753206982.jpg';
import galleryMythologyArm from '../assets/images/gallery_mythology_arm_1794753207347.jpg';
import galleryDaggerBlackwork from '../assets/images/gallery_dagger_blackwork_1794753208457.jpg';
import artistFounderPortrait from '../assets/images/artist_founder_portrait_1794753209423.jpg';
import artistFinelinePortrait from '../assets/images/artist_fineline_portrait_1794753208948.jpg';
import artistDarkartPortrait from '../assets/images/artist_darkart_portrait_1794753210585.jpg';

export type TattooStyle =
  | 'Все'
  | 'Black & Grey'
  | 'Тёмный сюрреализм'
  | 'Тонкая линия'
  | 'Мифология';

export interface GalleryWork {
  id: string;
  title: string;
  style: Exclude<TattooStyle, 'Все'>;
  artist: string;
  placement: string;
  sessions: string;
  image: string;
  featured?: boolean;
  description: string;
}

export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  availability: string;
  image: string;
  bio: string;
}

export interface PhilosophyPillar {
  id: string;
  index: string;
  title: string;
  calloutLabel: string;
  calloutDetail: string;
  pinPosition: { top: string; left: string };
  summary: string;
  technicalNote: string;
}

export interface ServiceItem {
  index: string;
  name: string;
  duration: string;
  rate: string;
  deposit: string;
  description: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  commission: string;
  artist: string;
  healedTime: string;
  quote: string;
}

export const STUDIO_MEDIA = {
  heroBack: heroBackTattoo,
  jokerConcept: conceptJokerPortrait,
  tattooMachine: '/assets/aistudio/image_3594c7f1.png',
};

export const GALLERY_WORKS: GalleryWork[] = [
  {
    id: 'spartan-sovereign',
    title: 'Спартанский суверен',
    style: 'Мифология',
    artist: 'Каэлен Восс',
    placement: 'Плечо и дельта',
    sessions: '2 сеанса · 11 ч',
    image: '/assets/aistudio/image_20db194a.png',
    featured: true,
    description:
      'Контрастный реализм Black & Grey: древний коринфский шлем, вписанный в рукописный греческий меандр и разряды молнии.',
  },
  {
    id: 'leviathan-anchor',
    title: 'Левиафан и якорь',
    style: 'Black & Grey',
    artist: 'Данте Рук',
    placement: 'Полурукав на плече',
    sessions: '2 сеанса · 13 ч',
    image: '/assets/aistudio/image_64b2d370.png',
    description:
      'Глубоководный змей, обвивающий стальной якорь, с холодными бирюзово-графитовыми акцентами и динамикой брызг в негативном пространстве.',
  },
  {
    id: 'medusa-split',
    title: 'Расколотая Медуза',
    style: 'Тёмный сюрреализм',
    artist: 'Елена Мороз',
    placement: 'Грудь и ключица',
    sessions: '1 сеанс · 7.5 ч',
    image: '/assets/aistudio/image_cb238949.png',
    description:
      'Анатомически выверенный сюрреалистичный портрет, рассечённый змеёй, уходящей к шее. Исполнен тончайшим випшейдингом.',
  },
  {
    id: 'cathedral-raven',
    title: 'Соборный ворон',
    style: 'Тёмный сюрреализм',
    artist: 'Данте Рук',
    placement: 'Предплечье полностью',
    sessions: '2 сеанса · 10 ч',
    image: galleryGothicSleeve,
    featured: true,
    description:
      'Готические своды собора, растворяющиеся в дыму под крылом ворона. Спроектировано с учётом естественного изгиба мышц предплечья.',
  },
  {
    id: 'spine-botanica',
    title: 'Ноктюрн на позвоночнике',
    style: 'Тонкая линия',
    artist: 'Елена Мороз',
    placement: 'Вдоль позвоночника',
    sessions: '1 сеанс · 6.5 ч',
    image: gallerySpineFineline,
    description:
      'Симметричный орнамент с листьями дикого папоротника и миниатюрными птичьими черепами, выстроенный строго по оси спины.',
  },
  {
    id: 'shattered-aurelius',
    title: 'Расколотый Аврелий',
    style: 'Мифология',
    artist: 'Каэлен Восс',
    placement: 'Внешняя часть плеча',
    sessions: '2 сеанса · 12 ч',
    image: galleryMythologyArm,
    description:
      'Раздробленный римский мраморный бюст, рассечённый тонкой алой линией разлома в эстетике кинцуги и клубами чёрного дыма.',
  },
  {
    id: 'ouroboros-blade',
    title: 'Уроборос и ритуальный клинок',
    style: 'Black & Grey',
    artist: 'Данте Рук',
    placement: 'Внутреннее предплечье',
    sessions: '1 сеанс · 6 ч',
    image: galleryDaggerBlackwork,
    description:
      'Плотный дотворк чешуи и строгая геометрия церемониального кинжала, рассчитанные на идеальную чёткость спустя годы.',
  },
];

export const ARTISTS: ArtistProfile[] = [
  {
    id: 'kaelen-voss',
    name: 'Каэлен Восс',
    role: 'Основатель и арт-директор реализма',
    specialty: 'Реализм Black & Grey · Античная скульптура · Перекрытие шрамов',
    experience: 'Опыт 14 лет',
    availability: 'Запись на дек – янв',
    image: artistFounderPortrait,
    bio: 'Выпускник классической школы масляной светотени. С 2012 года переносит академическую графику на кожу, специализируясь на масштабных спинах и интеграции шрамов.',
  },
  {
    id: 'elena-moroz',
    name: 'Елена Мороз',
    role: 'Ведущий архитектор тонкой линии',
    specialty: 'Single-Needle · Тёмный сюрреализм · Графическая ботаника',
    experience: 'Опыт 9 лет',
    availability: 'Запись на ноя – дек',
    image: artistFinelinePortrait,
    bio: 'Известна хирургической точностью контура иглами 3RL. Превращает анатомию ключиц, рёбер и позвоночника в живые монохромные гравюры.',
  },
  {
    id: 'dante-rook',
    name: 'Данте Рук',
    role: 'Мастер тёмного сюрреализма и блэкворка',
    specialty: 'Готическая архитектура · Плотный блэкворк · Дарк-реализм',
    experience: 'Опыт 11 лет',
    availability: 'Осталось 3 окна',
    image: artistDarkartPortrait,
    bio: 'Сочетает бруталистическую архитектурную перспективу с глубокой насыщенностью пигмента, которая не теряет контраста даже через десять лет.',
  },
];

export const JOKER_PILLARS: PhilosophyPillar[] = [
  {
    id: 'unpredictability',
    index: '01',
    title: 'Непредсказуемость',
    calloutLabel: 'Абсолютная непредсказуемость',
    calloutDetail: 'Никаких готовых каталогов. Свободное рисование по телу.',
    pinPosition: { top: '57%', left: '53%' },
    summary:
      'Каждый эскиз рождается прямо на вашей коже хирургическим маркером — мы не копируем чужие шаблоны. Мы ценим асимметрию, напряжение и живой характер.',
    technicalNote: 'Индивидуальная фрихэнд-композиция с учётом динамики мышц.',
  },
  {
    id: 'precision',
    index: '02',
    title: 'Ювелирная точность',
    calloutLabel: 'Микроконтроль глубины',
    calloutDetail: 'Точность иглы 0.25 мм на сложном рельефе кожи.',
    pinPosition: { top: '48%', left: '61%' },
    summary:
      'За тёмной эстетикой стоит инженерная дисциплина: калиброванный ход ротора, авторские разбавления грейвоша и безупречная глубина прокола.',
    technicalNote: 'Регулировка вылета и хода ротора 3.0–3.8 мм под каждую зону.',
  },
  {
    id: 'chaos',
    index: '03',
    title: 'Управляемый хаос',
    calloutLabel: 'Интеграция шрамов',
    calloutDetail: 'Превращаем шрамы и изъяны в ключевые линии рисунка.',
    pinPosition: { top: '65%', left: '47%' },
    summary:
      'Шрамы хранят историю — мы не маскируем их примитивными пятнами. Мастера вплетают рельеф рубцов в линии разломов, теней и сюрреалистичных силуэтов.',
    technicalNote: 'Деликатная малотравматичная техника работы по зажившей рубцовой ткани.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    name: 'Архитектура полного рукава и спины',
    duration: 'Серия сеансов · 12–30 ч',
    rate: '$2 400 / Полный день',
    deposit: 'Депозит $400',
    description:
      'Масштабные 3D-композиции с привязкой к анатомии тела и выверенным балансом заживших теней.',
  },
  {
    index: '02',
    name: 'Алхимия шрамов и перекрытий',
    duration: 'Индивидуальный разбор · 4–10 ч',
    rate: '$320 / Час',
    deposit: 'Депозит $250',
    description:
      'Очная оценка структуры кожи и разработка тёмной композиции, органично вбирающей старые тату или шрамы.',
  },
  {
    index: '03',
    name: 'Тонкая линия и тёмный сюрреализм',
    duration: 'Один сеанс · 3–7 ч',
    rate: '$300 / Час',
    deposit: 'Депозит $200',
    description:
      'Детализированные гравюры, сплит-портреты и ботаника в стерильных приватных кабинетах.',
  },
  {
    index: '04',
    name: 'Закрытое ночное погружение',
    duration: 'Аренда всей студии · 8 ч',
    rate: '$3 200 / Сеанс',
    deposit: 'Депозит $600',
    description:
      'Полная приватность ателье в Сохо, персональная акустика, авторские напитки и совместная проработка двумя мастерами.',
  },
];

export const REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Маркус Ванс',
    commission: 'Спартанский полурукав · 11 часов',
    artist: 'Каэлен Восс',
    healedTime: 'Зажило · 14 мес.',
    quote:
      'До OMG в двух студиях мне отказали из-за шрама на плече. Каэлен встроил линию разлома спартанского шлема прямо в рубец — спустя больше года контраст выглядит как в первый день.',
  },
  {
    id: 'rev-2',
    clientName: 'Сиенна Коваленко',
    commission: 'Ноктюрн на позвоночнике · 6.5 часов',
    artist: 'Елена Мороз',
    healedTime: 'Зажило · 8 мес.',
    quote:
      'Никаких шумных залов и спешки. Елена полтора часа подгоняла изгиб композиции вдоль моего позвоночника, прежде чем включить машинку. Каждый миллиметр дышит гармонией.',
  },
  {
    id: 'rev-3',
    clientName: 'Юлиан Мерсер',
    commission: 'Соборный ворон на предплечье · 10 часов',
    artist: 'Данте Рук',
    healedTime: 'Зажило · 11 мес.',
    quote:
      'Я пришёл лишь с абстрактной идеей готики и внутреннего хаоса. Данте перевёл это в татуировку, которая смотрится как музейный офорт из закрытой коллекции.',
  },
];
