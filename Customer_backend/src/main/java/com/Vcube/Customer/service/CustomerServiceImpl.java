package com.Vcube.Customer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import com.Vcube.Customer.model.Customer;
import com.Vcube.Customer.repo.CustomerRpo;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	CustomerRpo customerRepo;

	@Override
	public Customer createCustomerData(Customer c) {
		return customerRepo.save(c);
	}

	@Override
	public List<Customer> getAllCustomerInfo() {
		return customerRepo.findAll();
	}

	@Override
	public Customer getCustomer(Integer id) {
		return customerRepo.findById(id).get();
	}

	@Override
	public Customer updateData(Customer c, Integer id) {
		Customer customerFromDB = getCustomer(id);
		
		customerFromDB.setAge(c.getAge());
		customerFromDB.setCity(c.getCity());
		customerFromDB.setEmail(c.getEmail());
		customerFromDB.setName(c.getName());
		customerFromDB.setPhone(c.getPhone());
		customerFromDB.setState(c.getState());
		
		return customerRepo.save(customerFromDB);
	}

	@Override
	public void deleteCustomer(Integer id) {
		customerRepo.deleteById(id);
	}

	@Override
	public Customer findByEmail(String email) {
		// TODO Auto-generated method stub
		return customerRepo.findByEmail(email);
	}

}
