library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;
use ieee.std_logic_unsigned.all;
use work.fulladd_package.all;

entity test_my4add is
end test_my4add;

architecture arch_test of test_my4add is
  component my4add
    port(
      Cin : in  std_logic;
      X, Y: in  std_logic_vector(3 downto 0);
      Sout: out std_logic_vector(3 downto 0);
      Cout: out std_logic
    );
  end component;
  
  signal A, B, S: std_logic_vector(3 downto 0);
  signal Ci, Co : std_logic;
  
  begin
    uut: my4add port map(Ci, A, B, S, Co);
      
    tb : process
    begin
      wait for 100 ns;
      report "Hello Simulator";
      A   <= "0000";
      B   <= "0000";
      Ci  <= '0';
      
      for i in 0 to 2 loop
        for j in 0 to 2 loop
          wait for 10 ns;
          assert(S = A+B) report "The sum from 4 bit adder is S = " & integer'image(to_integer(unsigned(S))) & 
                                 " while the expected A + B = " & integer'image(to_integer(unsigned(A+B))) severity ERROR;
          B <= B + "0001";
        end loop;
        A <= A + "0001";
      end loop;   
      
      report "Test completed";    
      wait;
    end process;
end arch_test;