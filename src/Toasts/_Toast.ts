import Swal from 'sweetalert2';

import { ESwalIcon } from '../Types/Swal';
import { IToastGlobal } from './ToastInterface';

type TToast = 'top-end';

interface IToast extends IToastGlobal {
    position?: TToast;
}

const _Toast = (props: IToast) => {
    const {
        typeIcon = ESwalIcon.ERROR,
        position = 'top-end',
        title = '',
        subContent = '',
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

    const renderContent = {
        icon: typeIcon,
        title: title,
        text: subContent,
    };
    
    Toast.fire(renderContent);
};

export default _Toast;