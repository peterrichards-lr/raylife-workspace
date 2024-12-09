/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
/* global Liferay */


import ClayButton from '@clayui/button';
import {ClayCheckbox} from '@clayui/form';
import classNames from 'classnames';
import {useContext, useEffect, useState} from 'react';
import {getItem, setItem} from '../../../../../common/services/liferay/storage';
import {getLiferaySiteName} from '../../../../../common/utils/liferay';
import {getWebDavUrl} from '../../../../../common/utils/webdav';
import {
	ACTIONS,
	SelectedQuoteContext,
} from '../../../context/SelectedQuoteContextProvider';
import {createAccount} from '../../../services/Account';
import {
	checkoutOrder,
	getPaymentMethodURL,
	getPaymentMethods,
} from '../../../services/Cart';
import {createOrder, updateOrder} from '../../../services/Order';
import {
	updateQuoteBillingOption,
	updateQuoteOrder,
} from '../../../services/Quote';
import {SKU} from '../../../utils/constants';
import RadioButton from './RadioButton';

const PRODUCT_DISCOUNT = 0.05;

const PaymentMethod = () => {
	const [agree, setAgree] = useState(false);
	const [methods, setMethods] = useState([]);
	const [
		{
			commerce: {channel, skus},
			orderId,
			product: {dataJSON},
		},
		dispatch,
	] = useContext(SelectedQuoteContext);

	const product = JSON.parse(dataJSON);
	const productPrice = Number(product.price);
	const productPriceParcel = productPrice / 2;
	const promoPrice = productPrice * PRODUCT_DISCOUNT;
	const productDiscount = productPrice - promoPrice;

	const checkedMethod = methods.find(({checked}) => checked);

	const {
		basics: {businessInformation},
	} = JSON.parse(getItem('raylife-application-form'));

	function setPaymentFormat(value) {
		const currency = {
			currency: 'USD',
			style: 'currency',
		};

		return value.toLocaleString(
			'en-US',
			value % 1 === 0
				? Object.assign(currency, {maximumFractionDigits: 0})
				: currency
		);
	}

	const setPaymentMethods = async () => {
		const getSkuByName = (name) =>
			skus.find(({sku}) => sku === name) || skus[0];

		const installmentSKU = getSkuByName(SKU.INSTALLMENT);
		const fullPriceSKU = getSkuByName(SKU.PAY_IN_FULL);

		const {data = {}} = await getPaymentMethods(orderId);
		const {items: paymentMethods} = data;

		setMethods(
			paymentMethods.map((item) => ({
				checked: false,
				image: `${getWebDavUrl()}/${item.key.replace('-', '_')}.svg`,
				options: [
					{
						checked: true,
						description: `Save ${setPaymentFormat(promoPrice)}`,
						id: 0,
						orderItem: {
							discountAmount: promoPrice,
							finalPrice: productDiscount,
							id: 0,
							quantity: 1,
							skuId: fullPriceSKU.id,
							unitPrice: productDiscount,
						},
						title: `Pay in full - ${setPaymentFormat(
							productDiscount
						)}`,
					},
					{
						checked: false,
						description: '',
						id: 1,
						orderItem: {
							finalPrice: productPriceParcel,
							id: 0,
							quantity: 1,
							skuId: installmentSKU.id,
							unitPrice: productPriceParcel,
						},
						title: `2 payments of ${setPaymentFormat(
							productPriceParcel
						)}`,
					},
				],
				title: item.name,
				value: item.key,
			}))
		);
	};

	useEffect(() => {
		createAccount(
			`${businessInformation.firstName} ${businessInformation.lastName}`
		).then((account) => {
			dispatch({
				payload: account.id,
				type: ACTIONS.SET_ACCOUNT_ID,
			});

			if (!orderId) {
				createOrder(account.id, channel.id, skus[0].id).then(
					(response) => {
						const orderId = response.data.id;
						updateQuoteOrder(orderId);
						setItem('orderId', orderId);
						dispatch({
							payload: orderId,
							type: ACTIONS.SET_ORDER_ID,
						});
					}
				);
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderId]);

	useEffect(() => {
		if (orderId) {
			setPaymentMethods();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderId]);

	const onSelectedMethod = (value) => {
		setMethods(
			methods.map((method) => ({
				...method,
				checked: method.value === value,
			}))
		);
	};

	const onSelectedOption = (optionId) => {
		setMethods(
			methods.map((method) => ({
				...method,
				options: method.options.map((option) => ({
					...option,
					checked: option.id === optionId,
				})),
			}))
		);
	};

	const onClickPayNow = async (method) => {
		const {id, orderItem} = method.options.find(({checked}) => checked);

		updateQuoteBillingOption(id);

		await updateOrder(method.value, orderItem, orderId);

		await checkoutOrder(orderId);

		const {data: paymentMethodURL} = await getPaymentMethodURL(
			orderId,
			`${origin}${Liferay.ThemeDisplay.getPathContext()}${getLiferaySiteName()}/congrats`
		);

		window.location.href = paymentMethodURL;
	};

	return (
		<div className="c-mb-4 c-mt-5 ml-1 ml-sm-3">
			<div className="c-mb-3 c-mt-5 d-flex flex-column">
				<div className="h5 mb-3">Payment Method</div>

				{methods.map((method, index) => (
					<div
						className="align-items-center c-mb-3 d-flex flex-row payment-method"
						key={index}
					>
						<RadioButton
							onSelected={onSelectedMethod}
							selected={method.checked}
							value={method.value}
						>
							<div className="align-items-center d-flex justify-content-center">
								<div>
									<img
										className="bg-neutral-0 border c-p-1 card-outlined pay-card-image rounded-sm"
										src={method.image}
									/>
								</div>
							</div>

							<p>{method.title}</p>
						</RadioButton>
					</div>
				))}
			</div>

			<div className="c-mb-5 d-flex flex-column">
				{checkedMethod && (
					<>
						<div className="c-mb-3 h5">Billing Options</div>

						{checkedMethod.options.length ? (
							<>
								<div className="d-sm-flex">
									{checkedMethod.options.map(
										(option, index) => (
											<div
												className={classNames(
													'align-items-center billing-options c-mb-3 c-mr-3 c-px-5 c-py-3 d-flex flex-column justify-content-center rounded-sm',
													{
														'border':
															!option.checked,
														'selected shadow-lg type-payment-card-solid':
															option.checked,
													}
												)}
												key={index}
												onClick={() =>
													onSelectedOption(option.id)
												}
											>
												<div>
													<p className="text-center text-link-sm">
														{option.title}
													</p>

													<p
														className={classNames(
															'text-center',
															{
																'font-weight-bold text-accent-5 text-paragraph-xs':
																	option.checked,
																'text-paragraph-xs':
																	!option.checked,
															}
														)}
													>
														{option.description}
													</p>
												</div>
											</div>
										)
									)}
								</div>
								<div className="d-flex flex-row">
									<div className="c-mr-2">
										<ClayCheckbox
											checked={agree}
											name="agree-check"
											onChange={() => setAgree(!agree)}
											type="checkbox"
											value={agree}
										/>
									</div>

									<p className="align-items-center c-mb-6 d-flex justify-content-center justify-content-md-end text-paragraph-sm">
										<span>
											I have read and agree to the&nbsp;
											<strong>
												Raylife Terms and Conditions
											</strong>
										</span>
									</p>
								</div>
								<div className="c-mb-2 c-mt-7 d-flex justify-content-center justify-content-sm-end payment-button">
									<ClayButton
										className="btn-solid c-px-5 display-4 text-link-md text-uppercase"
										disabled={!agree}
										displayType="style-secondary"
										onClick={() =>
											onClickPayNow(checkedMethod)
										}
									>
										Pay Now
									</ClayButton>
								</div>
								{checkedMethod.value === 'paypal' && (
									<p className="d-flex justify-content-center justify-content-sm-end option-message text-center">
										You will be redirected to PayPal to
										complete payment
									</p>
								)}
							</>
						) : (
							<div className="no-options">
								<p>No options...</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default PaymentMethod;