import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FightButton from './FightButton';
import { useNavigate } from 'react-router-dom';

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const BattleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 76vh;
  position: relative;
`;

const CharacterBox = styled.div`
  width: 30vw;
  height: 70vh;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin: 0 5px;
`;

const CharacterImage = styled.div`
  width: 100%;
  height: 85%;
  background-color: #ccc;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  position: relative;
`;

const CheckboxGroup = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CheckboxLabel = styled.label`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  &.head { top: 5%; left: 50%; transform: translateX(-50%); }
  &.torso { top: 50%; left: 50%; transform: translate(-50%, -50%); }
  &.left-arm { top: 50%; left: 5%; transform: translateY(-50%); }
  &.right-arm { top: 50%; right: 5%; transform: translateY(-50%); }
  &.legs { bottom: 5%; left: 50%; transform: translateX(-50%); }

  input {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const MeterContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #eee;
  margin-bottom: 5px;
`;

const Meter = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background-color: ${props => props.color};
`;

const CharacterStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;

const ChatLog = styled.div`
  width: 98%;
  height: 22vh;
  overflow-y: auto;
  border: 2px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin: 10px auto;
  background-color: #f0f0f0;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  box-sizing: border-box;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
`;

const PopupButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
`;

const FightButtonWrapper = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const bodyParts = ['Head', 'Torso', 'Left Arm', 'Right Arm', 'Legs'];

const CombatSystem = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [playerAttack, setPlayerAttack] = useState('');
  const [playerDefense, setPlayerDefense] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isFightButtonDisabled, setIsFightButtonDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const chatLogRef = useRef(null);

  const addToChatLog = (message) => {
    setChatLog(prevLog => [...prevLog, message]);
  };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleFight = () => {
    if (!playerAttack || !playerDefense) {
      alert('Please select both attack and defense');
      return;
    }

    setIsFightButtonDisabled(true);

    const monsterAttack = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    const monsterDefense = bodyParts[Math.floor(Math.random() * bodyParts.length)];

    let playerDamage = 0;
    let monsterDamage = 0;

    if (playerAttack !== monsterDefense) {
      monsterDamage = Math.floor(Math.random() * 10) + 1;
      setMonsterHealth(prev => Math.max(0, prev - monsterDamage));
      addToChatLog(`Player attacked Monster's ${playerAttack} for ${monsterDamage} damage!`);
    } else {
      addToChatLog(`Monster successfully blocked Player's attack on ${playerAttack}!`);
    }

    if (monsterAttack !== playerDefense) {
      playerDamage = Math.floor(Math.random() * 10) + 1;
      setPlayerHealth(prev => Math.max(0, prev - playerDamage));
      addToChatLog(`Monster attacked Player's ${monsterAttack} for ${playerDamage} damage!`);
    } else {
      addToChatLog(`Player successfully blocked Monster's attack on ${monsterAttack}!`);
    }

    addToChatLog(`Player defended ${playerDefense}.`);
    addToChatLog(`Monster defended ${monsterDefense}.`);

    setPlayerAttack('');
    setPlayerDefense('');
    setIsFightButtonDisabled(false);
  };

  useEffect(() => {
    if (playerHealth <= 0) {
      setPopupMessage('You have been defeated by the monster!');
      setShowPopup(true);
    } else if (monsterHealth <= 0) {
      setPopupMessage('You have slain the monster, congrats!');
      setShowPopup(true);
    }
  }, [playerHealth, monsterHealth]);

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/');  // Navigate to the main square
  };

  return (
    <CombatContainer>
      <BattleArea>
        <CharacterBox>
          <CharacterImage>
            Player Image
            <CheckboxGroup>
              {bodyParts.map(part => (
                <CheckboxLabel key={`defend-${part}`} className={part.toLowerCase().replace(' ', '-')}>
                  <input
                    type="radio"
                    name="playerDefend"
                    value={part}
                    checked={playerDefense === part}
                    onChange={(e) => setPlayerDefense(e.target.value)}
                  />
                  {part}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </CharacterImage>
          <CharacterStats>
            <MeterContainer>
              <Meter value={playerHealth} color="#ff0000" />
            </MeterContainer>
            <div>HP: {playerHealth}/100</div>
          </CharacterStats>
        </CharacterBox>
        <FightButtonWrapper>
          <FightButton onClick={handleFight} disabled={isFightButtonDisabled} />
        </FightButtonWrapper>
        <CharacterBox>
          <CharacterImage>
            Monster Image
            <CheckboxGroup>
              {bodyParts.map(part => (
                <CheckboxLabel key={`attack-${part}`} className={part.toLowerCase().replace(' ', '-')}>
                  <input
                    type="radio"
                    name="playerAttack"
                    value={part}
                    checked={playerAttack === part}
                    onChange={(e) => setPlayerAttack(e.target.value)}
                  />
                  {part}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </CharacterImage>
          <CharacterStats>
            <MeterContainer>
              <Meter value={monsterHealth} color="#ff0000" />
            </MeterContainer>
            <div>HP: {monsterHealth}/100</div>
          </CharacterStats>
        </CharacterBox>
      </BattleArea>
      <ChatLog ref={chatLogRef}>
        {chatLog.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </ChatLog>
      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <p>{popupMessage}</p>
            <PopupButton onClick={handlePopupClose}>OK</PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </CombatContainer>
  );
};

export default CombatSystem;