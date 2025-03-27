import React, { useState } from 'react'

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [slide, setSlide] = useState(0)

  const slides = [
    {
      title: 'Plante saúde em poucos dias',
      text: 'Com o EcoMicro, cultivar alimentos supernutritivos em casa ficou fácil, rápido e acessível.',
    },
    {
      title: 'Passo a passo descomplicado',
      text: 'Aprenda como cultivar mais de 50 espécies com guias visuais, dicas práticas e vídeos curtos.',
    },
    {
      title: 'Transforme sua alimentação em 7 dias',
      text: 'Colha microverdes frescos direto da sua casa. Sem agrotóxicos, sem complicação.',
    },
  ]

  const nextSlide = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1)
    } else {
      onComplete()
    }
  }

  const ButtonText = () => {
    if (slide < slides.length - 1) {
      return 'Próximo →'
    } else {
      return 'Começar agora'
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-lime-50 overflow-hidden">
      <button
        onClick={onComplete}
        className="absolute top-5 right-5 text-lime-700 hover:underline focus:outline-none"
      >
        Pular
      </button>
      <div className="relative z-10 flex flex-col items-center p-8 max-w-md">
        <h2 className="text-3xl font-extrabold text-lime-700 mt-6 text-center">
          {slides[slide].title}
        </h2>
        <p className="text-sm text-lime-600 mt-4 text-center">
          {slides[slide].text}
        </p>
        <button
          onClick={nextSlide}
          className="mt-8 px-6 py-3 bg-lime-700 text-lime-50 rounded-full font-semibold hover:bg-lime-600 focus:outline-none"
        >
          <ButtonText />
        </button>
      </div>
    </div>
  )
}

export default Onboarding
