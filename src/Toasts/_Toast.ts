import Swal from 'sweetalert2';

import { ESwalIcon } from '../Types/Swal';

type TToast = 'top-end';

interface IToast {
    position?: TToast;
    title: string;
    typeIcon: ESwalIcon;
}

const _Toast = (props: IToast) => {
    const {
        typeIcon = ESwalIcon.ERROR,
        position = 'top-end',
        title = '',
    } = props;

    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: typeIcon,
        title: title,
    });
};

export default _Toast;