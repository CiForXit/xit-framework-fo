import Swal from 'sweetalert2';

const XitCmm = {
  /**
   * validation check error message
   * @param message
   */
  alertParam: (message: string) => {
    Swal.fire({
      icon: 'warning',
      html: message,
      //imageUrl:
      timer: 3000
    }).then((r) => {});
    return false;
  },

  /**
   * API Error message
   * @param message
   */
  alertError: (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'API error',
      html: message,
      //imageUrl:
      timer: 3000
    }).then((r) => {});
    return false;
  }
};
export default XitCmm;
