// Rust’s standard library provides a lot of useful functionality,
// but WebAssembly does not support all of it.
// eng_wasm exposes a subset of std.
#![no_std]

// The eng_wasm crate allows to use the Enigma runtime, which provides:
// manipulating state, creation of random, printing and more
extern crate eng_wasm;

// The eng_wasm_derive crate provides the following
//     - Functions exposed by the contract that may be called from the Enigma network
//     - Ability to call functions of ethereum contracts from ESC
extern crate eng_wasm_derive;
extern crate serde;

use eng_wasm::*;

// For contract-exposed functions first include:
use eng_wasm_derive::pub_interface;
use serde::{Serialize, Deserialize};


static OWNER: &str = "owner";
static SECRET_MESSAGES: &str = "secretMessages";
static DUMMY_MESSAGES: &str = "dummyMessages";

#[derive(Serialize, Deserialize)]
pub struct DummyMessages {
    dummy_messages: String,
}
#[derive(Serialize, Deserialize)]
pub struct SecretMessages {
    secret_messages: String, 
    secret_key: H160,
}

impl Contract {
    // Get all secret messages.
    fn get_all_secret_messages() -> Vec<SecretMessages> {
        read_state!(SECRET_MESSAGES).unwrap_or_default()
    }
    fn get_all_dummy_messages() -> Vec<DummyMessages> {
        read_state!(DUMMY_MESSAGES).unwrap_or_default()
    }
}
// For contract-exposed functions, declare such functions under the following public trait:
#[pub_interface]
pub trait ContractInterface{

    fn construct(owner: H160);

    fn storeDummy(message: String);

    // fn storeAll(message: String);

    // fn readDummy(sender: H160, password: String) -> String; 

    // fn readAll(sender: H160, password: String) -> String;
}

// The implementation of the exported ESC functions should be defined in the trait implementation 
// for a new struct. 
pub struct Contract;
impl ContractInterface for Contract {

    fn construct(owner: H160) {
        write_state!(OWNER => owner);

    }
    
    fn storeDummy(message: String) {

        //TODO JA: talk about security to recive this
        // let owner: H160 = read_state!(OWNER).unwrap()
        // assert_eq!(owner, sender)

        let mut dummy_messages = Self::get_all_dummy_messages();
        

        dummy_messages.push(DummyMessages {
            dummy_messages: message
        });

        write_state!(DUMMY_MESSAGES => dummy_messages);
    }
}
