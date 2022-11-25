import fs from "fs";

export class DeploymentAddressesFileBuilder {
  private deployments: { [key: string]: string } = {};

  addDeployment(name: string, address: string) {
    this.deployments[name] = address;
  }

  public generateDeploymentAddressesFile() {
    fs.mkdirSync("./deployment-info", { recursive: true });
    fs.writeFileSync(
      "./deployment-info/index.ts",
      this.generateInterface() +
        "export const deploymentAddresses: DeploymentAddresses = " +
        JSON.stringify(this.deployments)
    );
  }

  private generateInterface(): string {
    let start = "export interface DeploymentAddresses {\n";
    for (const key in this.deployments) {
      start += "\t " + key + ": string;\n";
    }
    return start + "}\n";
  }
}

export const deploymentAddressesBuilder = new DeploymentAddressesFileBuilder();
