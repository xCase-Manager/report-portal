class Configuration {
    #BASE_URL = "http://localhost:5000/api";
    EXECUTION_COLLECTION_URL = this.#BASE_URL + "/executions";
    TESTCASE_COLLECTION_URL = this.#BASE_URL + "/testcases";
    PROJECT_COLLECTION_URL = this.#BASE_URL + "/projects";
}
export default Configuration;