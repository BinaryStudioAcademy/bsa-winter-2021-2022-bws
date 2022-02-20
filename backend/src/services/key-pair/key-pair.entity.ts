class KeyPair {
  public id: string;
  public sshPemFileContent: string;
  public createdAt: string;

  private constructor({
    id,
    sshPemFileContent,
    createdAt,
  }: {
    id: string;
    sshPemFileContent: string;
    createdAt: string;
  }) {
    this.id = id;
    this.sshPemFileContent = sshPemFileContent;
    this.createdAt = createdAt;
  }

  public static initialize({
    id,
    sshPemFileContent,
    createdAt,
  }: {
    id: string;
    sshPemFileContent: string;
    createdAt: string;
  }): KeyPair {
    return new KeyPair({
      id,
      sshPemFileContent,
      createdAt,
    });
  }

  public static createNew({
    id,
    sshPemFileContent,
  }: {
    id: string;
    sshPemFileContent: string;
  }): KeyPair {
    return new KeyPair({
      id,
      sshPemFileContent,
      createdAt: new Date().toISOString(),
    });
  }
}

export { KeyPair };
