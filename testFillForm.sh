#! /bin/bash

function assert() {
  local message=$1
  local actual=$2
  local expected=$3

  local result='✅'
  if [[ "${expected}" != "${actual}" ]]
  then
    result='❌'
  fi 
  echo "$result $message"
}

function testFillForm(){
  local message=$1
  local inputs=$2
  local expected=$3

  local prompts=$(echo -ne "${inputs}" | node fillForm.js )

  actual=`cat form.json 2>/dev/null`
  assert "${message}" "${actual}" "${expected}"

}

function fillFormTestCases(){

  local inputs="pencil\n2000-10-10\nwriting,stopping\n9090909090\nsomewhere"

  expected='{"name":"pencil","dob":"2000-10-10","hobbies":["writing","stopping"],"ph_no":"9090909090","address":"somewhere"}'

  message="Should write details in file when form is filled"

  testFillForm "${message}" "${inputs}" "${expected}"

  rm form.json

  local inputs="pencil\n2000-10-10"
  expected=''
  message="Should not write details in file when form is not filled"
  testFillForm "${message}" "${inputs}" "${expected}"


  local inputs="john\npencil\n2000-10-10\nwriting,stopping\n9090909090\nsomewhere"
  expected='{"name":"pencil","dob":"2000-10-10","hobbies":["writing","stopping"],"ph_no":"9090909090","address":"somewhere"}'

  message="Should write valid details in file"

  testFillForm "${message}" "${inputs}" "${expected}"

}

fillFormTestCases
