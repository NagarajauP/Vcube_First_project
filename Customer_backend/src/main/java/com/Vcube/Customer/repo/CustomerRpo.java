package com.Vcube.Customer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Vcube.Customer.model.Customer;


@Repository
public interface CustomerRpo extends JpaRepository<Customer, Integer> {

	Customer findByEmail(String email);
	
}
