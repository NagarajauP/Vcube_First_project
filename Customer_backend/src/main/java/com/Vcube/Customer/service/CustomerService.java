package com.Vcube.Customer.service;

import java.util.List;

import com.Vcube.Customer.model.Customer;

public interface CustomerService {

	public abstract Customer createCustomerData(Customer c);

	public abstract List<Customer> getAllCustomerInfo();

	public abstract Customer getCustomer(Integer id);

	public abstract Customer updateData(Customer c,Integer id);

	public abstract void deleteCustomer(Integer id);

	Customer findByEmail(String email);

}
