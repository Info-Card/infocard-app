import Swal from 'sweetalert2';

export const showAlert = async (options: any) => {
  const result = await Swal.fire({
    showDenyButton: true,
    showCloseButton: true,
    focusConfirm: false,
    denyButtonColor: 'black',
    confirmButtonColor: 'green',
    confirmButtonText: options.button1Text,
    denyButtonText: options.button2Text,
    onConfirm: options.onButton1Click,
    onDeny: options.onButton2Click,
    ...options,
  });

  if (options.onConfirm && result.isConfirmed) {
    options.onConfirm();
  } else if (options.onDeny && result.isDenied) {
    options.onDeny();
  } else if (options.onCancel && result.isDismissed) {
    options.onCancel();
  }
};
