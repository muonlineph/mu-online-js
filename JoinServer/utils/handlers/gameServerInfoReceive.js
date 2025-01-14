const packetManager = require('@mu-online-js/mu-packet-manager');
const structs = require('./../packets/index');
const logger = require('./../logger');

/**
 * Handles GameServerInfo request coming from GS.
 * @param {Buffer} data
 * @param {Socket} socket
 */
const gameServerInfoReceive = ({data, socket}) => {
  const serverInfo = new packetManager().fromBuffer(data)
    .useStruct(structs.GSJSServerInfoSend).toObject();
  const gameServerInfo = {
    serverType: serverInfo.serverType,
    serverPort: serverInfo.serverPort,
    serverName: serverInfo.serverName,
    serverCode: serverInfo.serverCode,
    internalId: socket.remotePort
  };
  if (process.env.DEBUG_GS) {
    logger.info(gameServerInfo);
  }
};

module.exports = gameServerInfoReceive;
