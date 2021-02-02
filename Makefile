define ANNOUNCE_BODY
Required section:
	build - build project into build directory, with configuration file and environment
	clean - clean all addition file, build directory and output archive file
	test - run all tests
	pack - make output archive
Addition section:
endef

PROJECT_NAME = StorageSystem

GENERATE_VERSION = $(shell jq .version ./${PROJECT_NAME}/package.json )
GENERATE_BRANCH = $(shell git name-rev $$(git rev-parse HEAD) | cut -d\  -f2 | sed -re 's/^(remotes\/)?origin\///' | tr '/' '_')

SET_VERSION = $(eval VERSION=$(GENERATE_VERSION))
SET_BRANCH = $(eval BRANCH=$(GENERATE_BRANCH))
SET_PACK_NAME = $(eval PACK_NAME=$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz)

.SILENT:

COMPONENTS:

export ANNOUNCE_BODY

all:
	echo "$$ANNOUNCE_BODY"

build: ${PROJECT_NAME}/node_modules $(COMPONENTS)
	# required section
	echo Building started...
	$(SET_VERSION)
	npm run build --prefix ./$(PROJECT_NAME)
	cp README.md ./$(PROJECT_NAME)/build/
	cp CHANGELOG.md ./$(PROJECT_NAME)/build/
	cp LICENSE.md ./$(PROJECT_NAME)/build/
	mv ./$(PROJECT_NAME)/build/ ./
	echo Building completed.
	# required section

clean:
	# required section
	echo Cleaning started...
	rm -rf ./build/
	rm -rf *.tar.gz
	rm -rf ./$(PROJECT_NAME)/build/
	rm -rf ./$(PROJECT_NAME)/node_modules/
	rm -rf ./$(PROJECT_NAME)/package-lock.json
	echo Cleaning completed.
	# required section

test: $(PROJECT_NAME)/node_modules
	# required section
	echo Testing started...
	echo Testing completed.
	# required section

pack: build
	# required section
	$(SET_BRANCH)
	$(SET_VERSION)
	$(SET_PACK_NAME)
	echo Creating \"$(PACK_NAME)\" archive...
	cd ./build/ && tar czf ../$(PACK_NAME) .
	echo Archive \"$(PACK_NAME)\" created successfully.
	# required section

$(PROJECT_NAME)/node_modules:
	echo Installing project dependencies...
	npm i --prefix ./$(PROJECT_NAME)
