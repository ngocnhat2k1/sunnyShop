import { useEffect } from 'react';
import '../App.css';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonBanner from '../components/CommonBanner';
import AccountEditArea from '../components/AccountEditArea';
import axios from 'axios';

function AccountEdit() {

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/retrieveToken`, {
    //             headers: {
    //                 Authorization: `Bearer ${Cookies.get('token')}`,
    //             },
    //         })
    //         .then((response) => {
    //             if (!response.data.success) {
    //                 window.location.href = 'http://localhost:3000/login';
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <>
            <CommonBanner namePage="Account Info Edit" />
            <AccountEditArea />
        </>
    )
};

export default AccountEdit;