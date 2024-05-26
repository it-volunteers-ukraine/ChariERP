import clsx from 'clsx';

interface IStylesModal {
  isModalOpen: boolean;
}

export const getStyles = ({ isModalOpen }: IStylesModal) => ({
  overlay: clsx(
    'fixed inset-0 bg-overlay bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-40 opacity-0 transition-opacity ease-in-out duration-300',
    {
      'opacity-100': isModalOpen,
    },
  ),
  modal:
    'fixed rounded flex flex-col box-border min-w-80 overflow-hidden bg-white px-6 py-10',
  button:
    'absolute right-2 top-2 scale-100 transition-transform hover:scale-125',
});
