{
  description = "vite-plugin-content";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils/master";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.05";
  };

  outputs = { self, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in rec {
        devShell = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            nodejs-18_x
            nodePackages.pnpm
          ];
        };
      }
    );
}
