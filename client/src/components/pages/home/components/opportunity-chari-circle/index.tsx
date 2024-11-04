import { cards } from './mock';

export const OpportunityChariCircle = () => {
  return (
    <div className="relative m-auto flex h-[400px] w-[400px] items-center justify-center">
      <span className="absolute z-20 font-semibold text-blue-600">Можливості Chari ERP</span>

      <div className="relative h-full w-full animate-spin rounded-full bg-yellow-500">
        {cards.map((card, index) => {
          const angle = (index / cards.length) * 2 * Math.PI;
          const x = Math.round(200 * Math.cos(angle) * 100) / 100;
          const y = Math.round(200 * Math.sin(angle) * 100) / 100;

          return (
            <div
              key={index}
              style={{
                top: `calc(43% + ${x}px)`,
                left: `calc(38% + ${y}px)`,
              }}
              className="absolute w-fit animate-notRotate rounded-md bg-sky-500 p-2 text-white"
            >
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
};
