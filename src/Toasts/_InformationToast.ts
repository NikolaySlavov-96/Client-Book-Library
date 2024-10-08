import Swal from 'sweetalert2';

import { ESwalIcon } from '../Types/Swal';
import { IToastGlobal } from './ToastInterface';


const _InformationToast = (props: IToastGlobal) => {
    const {
        typeIcon = ESwalIcon.ERROR,
        title = '',
        subContent = '',
    } = props;

    const renderContent = {
        title: title,
        icon: typeIcon,
        text: subContent,
    };

    Swal.fire(renderContent);
};

export default _InformationToast;