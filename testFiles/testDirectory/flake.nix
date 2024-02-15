{
  description = "My Haskell Project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    myHaskellProject.url = ".";
    myHaskellProject.inputs = {
      nixpkgs.follows = "nixpkgs";
      haskell = {
        packages.${nixpkgs.system} = haskellPackages.ghc883;
      };
    };
  };

  outputs = { self, nixpkgs, myHaskellProject }: {
    defaultPackage.x86_64-linux = myHaskellProject.packages.${nixpkgs.system}.myHaskellProject;
  };
}
