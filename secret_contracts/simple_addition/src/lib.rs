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

static SECRET_MESSAGES: &str = "secretMessages";
static DUMMY_MESSAGES: &str = "dummyMessages";
static REAL_PASSWORD: &str = "bananaHammock";
static FAKE_PASSWORD: &str = "chickenDinner";

#[derive(Serialize, Deserialize)]
pub struct DummyMessages {
    dummy_messages: String,
}
#[derive(Serialize, Deserialize)]
pub struct SecretMessages {
    secret_messages: String
    // This should idealy be a msg.sender functionality not there
    // secret_key: H160,
}

impl Contract {
    // Get all secret messages.
    fn get_all_secret_messages() -> Vec<SecretMessages> {
        read_state!(SECRET_MESSAGES).unwrap_or_default()
    }
    fn get_all_dummy_messages() -> Vec<DummyMessages> {
        read_state!(DUMMY_MESSAGES).unwrap_or_default()
    }
    fn store_dummy(message: String) {
        //TODO JA: talk about security to recive this
        // let owner: H160 = read_state!(OWNER).unwrap()
        // assert_eq!(owner, sender)
        let mut dummy_messages = Self::get_all_dummy_messages();
        dummy_messages.push(DummyMessages {
            dummy_messages: message
        });
        write_state!(DUMMY_MESSAGES => dummy_messages);
    }
    fn store_secret(message: String) {
        //TODO JA: talk about security to recive this
        // let owner: H160 = read_state!(OWNER).unwrap()
        // assert_eq!(owner, sender)
        let mut secret_messages = Self::get_all_secret_messages();
        secret_messages.push(SecretMessages {
            secret_messages: message
        });
        write_state!(SECRET_MESSAGES => secret_messages);
    }
}
// For contract-exposed functions, declare such functions under the following public trait:
#[pub_interface]
pub trait ContractInterface{

    fn construct(real_password: String, fake_password: String);

    fn write_storage(password: String, message: String);

    fn read_storage(password: String) -> String;

}

// The implementation of the exported ESC functions should be defined in the trait implementation
// for a new struct.
pub struct Contract;
impl ContractInterface for Contract {

    fn construct(real_password: String, fake_password: String) {
        write_state!(REAL_PASSWORD => real_password);
        write_state!(FAKE_PASSWORD => fake_password);
    }

    fn write_storage(password: String, message: String) {
        let fake_password: String = read_state!(FAKE_PASSWORD).unwrap();
        let real_password: String = read_state!(REAL_PASSWORD).unwrap();

        if password == fake_password {
            Self::store_dummy(message);
        } else if password == real_password {
            Self::store_secret(message);
        } else {
            panic!("wrong password");
        }
    }

    fn read_storage(password: String) -> String {
        let fake_password: String = read_state!(FAKE_PASSWORD).unwrap();
        let real_password: String = read_state!(REAL_PASSWORD).unwrap();

        // let real_password =  read_state!(REALPASSWORD).unwrap_or_default();

        let mut my_concatenated_secret_messages: String = String::new();

        let separator = String::from("|");
        if password == fake_password {
            let all_secret_messages = Self::get_all_dummy_messages();
            for one_secret_message in all_secret_messages {
                // For a given message, is the user (sender) in the whitelist?
                    // Yes, so add the message.
                        // Concatenate the message with the others.
                        my_concatenated_secret_messages.push_str(&one_secret_message.dummy_messages);
                        // Add the separator.
                        my_concatenated_secret_messages.push_str(&separator);

            }

            // Remove last separator & return messages.
            my_concatenated_secret_messages.pop();
            // Return secret messages for sender.
            return my_concatenated_secret_messages;
        }
        else if password == real_password {
            let all_secret_messages = Self::get_all_secret_messages();
            for one_secret_message in all_secret_messages {
                // For a given message, is the user (sender) in the whitelist?
                    // Yes, so add the message.
                        // Concatenate the message with the others.
                        my_concatenated_secret_messages.push_str(&one_secret_message.secret_messages);
                        // Add the separator.
                        my_concatenated_secret_messages.push_str(&separator);

            }

            // Remove last separator & return messages.
            my_concatenated_secret_messages.pop();
            // Return secret messages for sender.
            return my_concatenated_secret_messages;
        }
        else {
          panic!("wrong password");
        }
    }
}
