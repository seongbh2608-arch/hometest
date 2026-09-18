import React from 'react';

const CONCERNS = [
  {
    title: '학습',
    desc: '좋아하는 주제로 시작해서 하기 싫었던 영역까지 고루 배워보며 배움에 긍정적인 경험을 쌓아 줍니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmdaQNFGbpep2GIXtsjX10Yb-SF-SsjNNSUOR6bkDI7xPKjwYgD_DYQIb0VzipVWv1wTMPYX2b2lpjIbZwPPOiAFeoK6r5OGJHWg_OyoVBtoIHEE7akNVUY6IV7HgFAhmRJgB_jv0_5XfdMqhga9QuXesSRzibhp62OeQi7NxwxosboCjFMNXV9pj0VAtObH_-Kcqq5UlFhTRmACWeYe1pZC7Y88CSWIniU9_bfWtyhOOqIFC7zYW1'
  },
  {
    title: '자존감',
    desc: '아이가 자신을 어떻게 생각하는지 확인하고 긍정적인 자아상을 쌓도록 노력합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjGY65ghqb2cNqUdKVkfJcYMMtbHjfVPc5DSa2CfBo7zX-bPqjQX1H7eeitdQJZS3o_t7PJHpKCoATrk7VS0wSLkg1y29QDtUsJq1GBwIv9DlbkqosUPXLOUsK5vrUoXrvHYp4LF9sPzSQ9_PJDDhe9Zwrmm3swfpMDMGWna5MwVBgP1N7R8CiKyVSbXz_FVdu555gNjdNdqd1wJ3XC2oHX229NRg93awl7AxvdM9BNqagdglU8Q9c'
  },
  {
    title: '사회성',
    desc: '또래 아이들과의 상호작용을 관찰하고 훈련받은 교사가 따뜻하게 코칭해줍니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBftHG0yEXuVRiqycjUdDd9u_3mVs1jXZN1CtQuuMi646C3kIO1sD_G1hHSUoHsbsvtqEvZncwFDQJt6U8cbcO11BoLFSISsWk-hWC2168EwxP8EthDq0n8s3gzWka0MmuulT6YS44PCMA0Cau1ryWH7UHuJ-2s2KsyiTEvubW4RhCHbj5ERszbsJa4sw3jcrWfN1Oydee0XM18aPHKyVbw4ptDKo9NsclJQXB06ZosxxRSMzPgJVC1'
  },
  {
    title: '기질',
    desc: '아이마다 다른 성향과 에너지를 파악하여, 자신만의 방법으로 세상을 당당하게 탐색하는 경험을 만듭니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-WkPehVg-MT3d1Itu_yiMW3xCKgXuNDM2_FPTiD612LRDqCPh-yKMm-jfktILDX7ENOzIdyYl0UMj_wEWW_Wubybmujj7q9ho1EfBdz_YVOFY340Zrtv-tXQq2GewlQ0_skejLqRHdUwLQnaU6slfWXEy2khnYR1vRwhns7F3YENzmxWziSBHhJm5SpmSsqMnWzatniVT19zRYrTQ0O9EoZLnHBRub61uJNb2-O7M94xeTBiro7_B'
  }
];

export const MothersConcernsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-14" id="philosophy">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <span className="text-xs font-bold text-amber-600 tracking-wider uppercase mb-2 inline-block">
          Mothers' Real Concerns
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-12">
          자라다에서 연구하고 있는<br />
          아들 엄마의 고민 5가지
        </h2>

        {/* 4-Card Workshop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {CONCERNS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200 group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
