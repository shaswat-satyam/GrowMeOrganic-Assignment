{
  description = "This is a flake to Setup Development environment for the project";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-25.05";
  };

  outputs = { self, nixpkgs, ... }: let
    system = "x86_64-linux";
    pkgs =  import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [ 
        hello
      ];
      shellHook = '' 
        ${pkgs.hello}/bin/hello
      '';
    };
  };
}
