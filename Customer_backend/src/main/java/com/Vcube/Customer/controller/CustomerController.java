package com.Vcube.Customer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Vcube.Customer.model.Customer;
import com.Vcube.Customer.service.CustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

	@Autowired
	CustomerService customerService;

	@GetMapping("/wel")
	String welcome() {
		return "Welcome to Spring Boot World ";
	}

	@GetMapping("/getCus/{cid}")
	Customer getCustomer(@PathVariable Integer cid) {
		return customerService.getCustomer(cid);
	}

	@PutMapping("/update/{cid}")
	Customer updateCustomer(@RequestBody Customer c, @PathVariable Integer cid) {
		return customerService.updateData(c, cid);

	}

	@DeleteMapping("/delete/{cid}")
	String deleteCustomer(@PathVariable Integer cid) {
		customerService.deleteCustomer(cid);
		return "Customer" + cid + "Deleted Successfully";
	}

	@GetMapping("getcus/email/{email}")
	Customer getCustomer(@PathVariable String email) {
		return customerService.findByEmail(email);

	}

	@GetMapping("/getcustomers")
	List<Customer> getAllCustomers() {
		return customerService.getAllCustomerInfo();
	}

	@PostMapping("/create")
	Customer createCustomerInfo(@RequestBody Customer c) {
		return customerService.createCustomerData(c);

	}

}
