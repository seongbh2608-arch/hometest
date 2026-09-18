import React from 'react';

const PILLARS = [
  {
    step: '첫번째',
    title: '미술을 전공한 남자 교사',
    desc: '미술을 전공한 남자 교사이면서 자라다 전문 심화 교육을 통과한 검증된 교사들만 근무합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvObZqnFWWIdlYe6_XF-TIEu7POHSJ9-ktC43tM1cB67qn6rT6HeYHv9krpaLsiE7MmbcZjaTY5dkIVAMGlUZ1PV3_6m6qNRKnsqxyWJkXhHLjFIsNfoxn_eN__ONe5HD1UdJ2kWwOAKRRZYUyW1oIcKDUU9zAnVU_rFEeV1V_1TWyuPoN-P7pmbJNz1rZMv8e4pw5w2NliVLBIXJE3365M9uE4ej3l3xjs5E2tpIRIsz0W0r7LLru'
  },
  {
    step: '두번째',
    title: '성장의 긍정적 상호작용',
    desc: '자라다는 단순 1인 1미술 기술 전달이 아닌, 아이들 성장에 실질적인 긍정적 상호작용을 제공합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJrH4eIcb3YTQcbv3WX7Mfz-K_zb-5PUhsMKHQoNN-_rkrr-9O1Co9jBBMVftarSyj1-5KM3E281fAeP_jVh6C1ARx_7JLAqDavC9pSILAEWhaJg8b4PQhdqiopwXV-RzQiEsLGob5IKKUY9MVXIDNHOgqXy3Rv-tngf1EDMvcXdPs3Y7KzrtGDXCuLsW25eUBcjPee2fGPoI7T33rbLFN7T34Evae3vZmERycEgWBwV1ByrF6gsl-'
  },
  {
    step: '세번째',
    title: '건강한 남성 롤모델',
    desc: '자라단 남자 아동이 신뢰할 수 있는 건강한 남성 롤모델의 멘토 역할을 수행하도록 전문 자격 코스를 운영합니다.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgqdrj-t6xNKVURy7CUIUqfs6HuaNNIGH7Y5aQbSVTpKhcXnrN9reyp38NuR1o5Pj3vG_U8m78KS4pem72mOhDSgExGDgYZrt8JHUSBMrxrn1SpHLZ60kgtUHTv9rVryEmVR_31hOFJKF52l6N8D4upy8p4XqKbFRWO5fg1BrXBvuwFokUmimulF59NAdHdjW1tvshaAxr4nA3dk__wEnsGPGk96BhGMC3sayawfrqihH6-PNerHNk'
  }
];

export const TeacherSystemSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white scroll-mt-14" id="teachers">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
          Teacher Certification
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3">
          자라다의 철저한 교사 교육 시스템
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-14">
          말로 태어난 엄마는 죽어도 모르는 아들 미술교육 노하우
          <br />
          남아 미학은 다르게 가르쳐야 합니다.
        </p>

        {/* 3 Pillars Cards with Dark Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 h-[380px] flex flex-col justify-end p-6 group hover:border-amber-400/80 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500"
            >
              <img
                alt={pillar.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.38] group-hover:brightness-[0.46] group-hover:scale-108 transition-all duration-700"
                src={pillar.image}
              />
              <div className="relative z-10 space-y-2">
                <span className="inline-block bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded shadow group-hover:bg-amber-300 transition-colors">
                  {pillar.step}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
