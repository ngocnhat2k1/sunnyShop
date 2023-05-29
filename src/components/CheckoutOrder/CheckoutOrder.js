import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Cookies from 'js-cookie'
import "./CheckoutOrder.css"
import AccountEditModal from '../AccountEditArea/AccountEditModal';
import { formatter } from '../../utils/utils';

const CheckoutOrder = () => {
    const [listProduct, setListProduct] = useState([]);
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")
    const [percent, setpercent] = useState(0)
    const [voucherId, setvoucherId] = useState("")
    const [nameReceiver, setnameReceiver] = useState('')
    const [phoneReceiver, setphoneReceiver] = useState('')
    const [totalPriceCart, settotalPriceCart] = useState(0)
    const [district, setdistrict] = useState('')
    const [province, setprovince] = useState('')
    const [ward, setWard] = useState('')
    const [street, setStreet] = useState('')
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/cart/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setListProduct(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const closeModal = () => {
        setModal(!modal);
    }


    const PlaceOrder = (data) => {
        const payload = {
            phoneReceiver: phoneReceiver,
            nameReceiver: nameReceiver,
            voucherId: voucherId,
            totalPrice: totalPriceCart - (percent * totalPriceCart / 100),
            address: street + ' ' + ward + ' ' + district + ' ' + province
        }
        console.log('chạy do on click')
        axios
            .post(`http://localhost:8000/order/`, payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setMessage(response.data.message)
                setSuccess(response.data.success)
                if (response.data.success) {
                    navigate("/order-completed")
                    axios
                        .get(`http://localhost:8000/cart/clearCart`,
                            {
                                headers: {
                                    Authorization: `Bearer ${Cookies.get('token')}`,
                                },
                            })
                        .then((response) => {

                        })
                        .catch((error) => {

                        })
                } else {
                    setModal(!modal)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [couter, setcouter] = useState(0)
    useEffect(() => {
        listProduct.map((product) => {
            if (couter < 1) {
                settotalPriceCart(totalPriceCart => totalPriceCart + (product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)
                setcouter(couter + 1)
            }
        })
    }, [listProduct])

    const toggleModal = () => {
        setTimeout(() => { setModal(!modal); }, 1000)
    };
    const onSubmit2 = (data) => {
        axios
            .post(`http://localhost:8000/voucher/check`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((response) => {
                setMessage(response.data.success)
                setSuccess(response.data.success)
                if (response.data.success) {
                    setvoucherId(response.data._id)
                    setpercent(response.data.percent)
                }
            })
    }


    return (
        <section id='checkout' className='ptb-100'>
            <div className='container'>
                <Row>
                    <Col lg={6} md={12} sm={12} xs={12}>
                        <div className='checkout-area-bg bg-white'>
                            <div className='check-heading'>
                                <h3>Billings Information</h3>
                            </div>
                            <div className='check-out-form'>
                                <form onSubmit={handleSubmit(PlaceOrder)}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="nameReceiver">Name Receiver<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value={nameReceiver}
                                                    className='form-control'
                                                    placeholder='Name Receiver'
                                                    {...register("nameReceiver", { required: true, onChange: (e) => { setnameReceiver(e.target.value) } })} />
                                            </div>
                                        </Col>

                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="phoneReceiver">Phone Receiver<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value={phoneReceiver}
                                                    className='form-control'
                                                    placeholder='Phone Receiver'
                                                    {...register("phoneReceiver", { required: true, onChange: (e) => { setphoneReceiver(e.target.value) } })} />
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="province">Province<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value={province}
                                                    className='form-control'
                                                    placeholder='Province'
                                                    {...register("province", { required: true, onChange: (e) => { setprovince(e.target.value) } })} />
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="district">District<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value={district}
                                                    className='form-control'
                                                    placeholder='District'
                                                    {...register("district", { required: true, onChange: (e) => { setdistrict(e.target.value) } })} />
                                            </div>
                                        </Col>
                                        <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="ward">Ward<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value={ward}
                                                    className='form-control'
                                                    placeholder='Ward'
                                                    {...register("ward", { required: true, onChange: (e) => { setWard(e.target.value) } })} />
                                            </div>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <div className='form-group'>
                                                <label htmlFor="street">Street<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    value={street}
                                                    className='form-control'
                                                    placeholder='Ex: 36 Nguyen Chi Thanh '
                                                    {...register("street", { required: true, onChange: (e) => { setStreet(e.target.value) } })} />
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                        <div className='order_review  bg-white'>
                            <div className='order_review bg-white'>
                                <div className='check-heading'>
                                    <h3>Apply Voucher</h3>
                                </div>
                                <div className='coupon'>
                                    <form onSubmit={handleSubmit2(onSubmit2)}>
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            {...register2("name")}
                                        />
                                        <AccountEditModal message={message} success={success} nameBtn='Apply coupon' />
                                    </form>
                                </div>
                            </div>

                            <div className='check-heading'>
                                <h3>Your Orders</h3>
                            </div>
                            <div className='table-responsive order_table'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProduct.map((product, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{product.product.name}<span className="product-qty"> X {product.quantity}</span></td>
                                                    <td>{formatter.format((product.product.price * ((100 - product.product.percent_sale) / 100)) * product.quantity)}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>SubTotal:</th>
                                            <td className='product-subtotal'>{formatter.format(totalPriceCart)}</td>
                                        </tr>
                                        <tr>
                                            <th>Discount:</th>
                                            <td >{percent}% </td>
                                        </tr>
                                        <tr>
                                            <th>Total:</th>
                                            <td className='product-subtotal'>{formatter.format(totalPriceCart - (percent * totalPriceCart / 100))} </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className='coupon' onClick={PlaceOrder}>
                                <button type="submit" className="theme-btn-one bg-black btn_sm" >Place Order</button>
                                {modal && (
                                    <div className="modal">
                                        <div onClick={toggleModal} className="overlay"></div>
                                        <div className="modal-content">
                                            <div>
                                                {success == true ? <FaRegCheckCircle size={90} className='colorSuccess' /> : <FaTimesCircle size={90} className='colorFail' />}
                                            </div>
                                            <h2 className="title_modal">Place Order {success ? 'Successful' : 'Failed'}</h2>
                                            <p className='p_modal'>{message}</p>
                                            <div className='divClose'>
                                                <button className="close close-modal" onClick={closeModal}>OK</button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default CheckoutOrder