import { Branch, VideoItem, TestimonialItem } from '../types';

export const BRANCHES: Branch[] = [
  { id: 'ilsan', name: '일산 본원', region: '경기/고양', address: '경기도 고양시 일산동구 일산로 224, 4층', phone: '031-901-0040' },
  { id: 'daechi', name: '강남 대치센터', region: '서울/강남', address: '서울 강남구 남부순환로 2917, 3층', phone: '02-555-1883' },
  { id: 'banpo', name: '서초 반포센터', region: '서울/서초', address: '서울 서초구 신반포로 194, 2층', phone: '02-535-1883' },
  { id: 'jamsil', name: '송파 잠실센터', region: '서울/송파', address: '서울 송파구 올림픽로 119, 4층', phone: '02-414-1883' },
  { id: 'mokdong', name: '양천 목동센터', region: '서울/양천', address: '서울 양천구 목동서로 159-1, 5층', phone: '02-2644-1883' },
  { id: 'mapo', name: '마포 공덕센터', region: '서울/마포', address: '서울 마포구 백범로 31길 21, 3층', phone: '02-717-1883' },
  { id: 'bundang', name: '분당 정자센터', region: '경기/성남', address: '경기 성남시 분당구 정자일로 135, 3층', phone: '031-718-1883' },
  { id: 'gwanggyo', name: '수지 광교센터', region: '경기/용인·수원', address: '경기 용인시 수지구 광교중앙로 296, 4층', phone: '031-216-1883' },
  { id: 'songdo', name: '인천 송도센터', region: '인천/연수', address: '인천 연수구 컨벤시아대로 69, 3층', phone: '032-832-1883' },
  { id: 'haeundae', name: '부산 해운대센터', region: '부산/해운대', address: '부산 해운대구 센텀동로 57, 5층', phone: '051-747-1883' },
  { id: 'dunsan', name: '대전 둔산센터', region: '대전/서구', address: '대전 서구 대덕대로 233, 4층', phone: '042-488-1883' },
  { id: 'susung', name: '대구 수성센터', region: '대구/수성', address: '대구 수성구 달구벌대로 2435, 3층', phone: '053-755-1883' }
];

export const TIME_SLOTS = [
  '10:00 - 11:10 (오전 1부)',
  '11:30 - 12:40 (오전 2부)',
  '14:00 - 15:10 (오후 1부)',
  '15:30 - 16:40 (오후 2부)',
  '17:00 - 18:10 (오후 3부)'
];

export const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: '강요하지 않아도 알아서 잘하는 아들 특징',
    views: '조회수 230만회',
    duration: '14:22',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnLaW17KEiCEGD01HUkNXqzieL6oy41nJaNaMEPhi9ypJqBswcNFV7mXMjTN0K9a1CTz-DSy5Ge_Ra4JV4Gjh_rCBVdOKp514gyW9zghNLeyjUwD1QkHmV1JKiYhVYKUgLtstvbkBk6y8KVeVA1RCFpmYbkHAv6RZ8Q2t3mnS3O0v-VJInUE-Mjfc-BF3VilitjQb6scqtBG7AjXdAm42lSwacqnaKza6QcITTdS71iD4GltlCDW_L',
    youtubeUrl: 'https://www.youtube.com',
    description: '남자아이의 주도성과 자기조절 능력을 키우는 자라다만의 훈육 및 미술 심리 접근법'
  },
  {
    id: 'vid-2',
    title: "아들의 10년 후를 바꾸는 하루에 5분 '이 행동'",
    views: '조회수 180만회',
    duration: '11:08',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJiONF-up99KXlpDySf1omJAAVOVw4fda6pISb51WxpSEAAQy64ZFIMnwJrhkRQAYrAqtvq66sgiOLVmpZoVZpUzIFbEki4i23iX3VPVMBJIJOyVgSyxJj6RItSG7_hejbMVyyNIpfy-vudDj6kh5LF5o5bLqeOZS4g8B_1hJxcmUAsW4kcaaO5-feDTUXGUWTaEeIMivBwoqnFreZ629wGs5Ew8M4jS4-8letlN7THsZXMaKkUALY',
    youtubeUrl: 'https://www.youtube.com',
    description: '엄마의 잔소리 없이도 아들의 몰입감과 사고력을 키워주는 5분 대화법'
  },
  {
    id: 'vid-3',
    title: '"엄마 나 화가 조절이 안 돼" 아이의 이 신호 오해하면 안 됩니다',
    views: '조회수 27만회',
    duration: '16:45',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOIU2XLFpJpL28QkMRJxj2yrEo-HdSDQWDHthWsi44vvm0lArQk5f_lmAAYKD2UUskrxdRSuz7SIG1WZVOan_CWSl-zNRuaRA6IHcf2GHOX1rYRFgnnDcDP7D7D3QyXWNNN7pxpw7zcOhQXGLdwZfBtiwOiECRVGstGSVJNr5_8Z1TirXPLWOFVKI_w665p1qfebopMDbH5lRIPXtmczTXbNOQaDwzu7cAiIlb6LiOWMTMkrkU4cZX',
    youtubeUrl: 'https://www.youtube.com',
    description: '남자아이의 분노와 감정 폭발 뒤에 숨겨진 신호와 미술을 통한 건강한 감정 해소법'
  },
  {
    id: 'vid-4',
    title: '아들에게 잔소리 대신 엄마가 먼저 바꿔야 할 단 한 가지',
    views: '조회수 110만회',
    duration: '13:19',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMumjpwsv0zIcxaqpmGCRJjtmbUWPtfqhPFm8nPa0MUggsJTVekqNvT2fx-sRpLVS9Ca3RNouzKWd8dwchnPNCHz5_hgp-khs4QS3kfU_0xaODh4AL5p88dzxhggHLZ-Efiq0k9nr4WXPLvSUPRD9RQ4UuBuOTVADuf9z1skwCaHVCKFLQ2FtdxslMPU3nRqQ1Xhe5M23UNKkG6rrlU6_mVGW93w8JXKyd50kHnPdgPc9eRaZpXy8R',
    youtubeUrl: 'https://www.youtube.com',
    description: '부모와 아들의 갈등을 멈추고 서로를 신뢰하는 동반자로 만들어주는 언어 전환 기술'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    author: '0s***',
    content: '명쾌하고 정확하고 따뜻한 솔루션입니다. 아이들 지도에 정말 도움이 됩니다. 진심 감사드립니다.',
    defaultLikes: 7
  },
  {
    id: 'test-2',
    author: '01***',
    content: '근래 제일 알아주던대로 내버려뒀기 전엔 팍 막누르고 어떻게 해 말았단 막 대화를 덜컥하게 끝내니 아이도 무엇인지 열지않고 뭉치고 돌아서더라고요 ㅎㅎ 진짜 신기한 말치기 방법도 요즘 내 아이의 마음에 닿네요!',
    defaultLikes: 21
  },
  {
    id: 'test-3',
    author: '0g***',
    content: '선생님 영상 보고 정말 도움 많이 받고 주변에 아들키우는 엄마들에게 부지런히 공유하고 있습니다. 오늘 영상도 구체적인 예시가 (소년에 좋은 예) 큰 도움이 되네요^^ 늘 감사하고 응원합니다~^^',
    defaultLikes: 3
  },
  {
    id: 'test-4',
    author: '01*** (초등 남아 아빠)',
    content: '와.. 너무 좋은 강의입니다. 저도 아빠가 처음이다 보니, 너무 서툴며, 어제도 햇님의 사정 아이를 탓하며 대화하는 법이 좁혔다고 지적했는데.. 이거 보면서 또 배우고 자라고 깨닫고 그러네요. 너무 좋은 교육 감사합니다. 아이에게는 부모 양육이 다 준거 같아요. 부모가 제대로 배워서 제대로 하면 아이도 잘 따르는거 같습니다.',
    defaultLikes: 34
  }
];
