#!/bin/sh
echo "Testing..."
go get -u github.com/boumenot/gocover-cobertura
go get -u github.com/jstemmer/go-junit-report
go test -v -coverprofile=coverage.txt ./... 2>&1 | go-junit-report -set-exit-code > report.xml
TEST_RESULT=$?
echo "Generating test coverage..."
gocover-cobertura < coverage.txt > coverage.xml

[ $TEST_RESULT -eq 0 ] || echo "Some test have failed check the result." && exit $TEST_RESULT
