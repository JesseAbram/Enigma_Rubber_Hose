# Nothing Hose

This product is a demo of secret smart contracts on Enigma.

## Problem

[The Rubber Hose Problem ](https://en.wikipedia.org/wiki/Rubber-hose_cryptanalysis?fbclid=IwAR2hoWG0Sx9ag1_uNRErwNWnUA8jtvhi2_vo1Tq9JaZ0A-o3TkDT6TwbMHw)


## Solution

* Server side solution to the rubber house problem
* Alice creates two data sets 
* The data is encrypted and hidden with Enigma
* Alice has two passwords --> later implementation the passwords should be private keys and we should be able to access the information from. This was not implemented in Enigma yet
* One password returns the fake data and one password returns the real data

## Secret Smart contract 

### public functions

 ```
 fn construct(real_password: String, fake_password: String);
 ```
 * Constructor, sets passwords
```
fn write_storage(password: String, message: String);
```
* Writes to either fake or real storage based on which password is provided.

```
    fn read_storage(password: String) -> String;
```
* Returns either the fake state or real state based on the password 

### private functions

```
fn get_all_secret_messages() -> Vec<SecretMessages>
```
```
fn get_all_dummy_messages() -> Vec<DummyMessages> 
```
```
fn store_dummy(message: String)
```
```
fn store_secret(message: String) 
```