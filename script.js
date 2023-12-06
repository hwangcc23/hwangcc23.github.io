$(document).ready(function(){
    $("#cardForm").submit(function(event){
        event.preventDefault();
        var name = $("#nameInput").val();
        var searchCards = $("#cardInput").val();
        console.log("[Debug] search " + searchCards + " from " + name);

        $.getJSON("sdbh.json", function(jsonData) {
            var results = [];
            var jsonDataIndex = -1;
            for (var i = 0; i < jsonData.length; i++) {
                var entry = jsonData[i];
                const str = JSON.stringify(entry);
                if(str.includes(name)){
                    results.push(str);
                    jsonDataIndex = i;
                }
            }

            const matchingCards = [];
            for (const card of jsonData[jsonDataIndex].cards) {
                if (card.name == name) {
                    const matchingSeq = [];
                    for (const seq of card.seq) {
                        if (seq.num.toString() == searchCards) {
                            matchingCards.push(seq);
                        }
                    }
                    if (matchingSeq.length > 0) {
                        matchingCards.push({
                            index: card.index,
                            seq: matchingSeq
                        });
                    }
                }
            }

            if (results.length > 0) {
                $("#results").empty();
                $("#results").append("<li>找到惹</li>");
                for (var j = 0; j < results.length; j++) {
                    console.log("[Debug] results[" + j + "] = " + results);
                }
                for (var j = 0; j < matchingSeq.length; j++) {
                    console.log("[Debug] matchingSeq[" + j + "] = " + matchingSeq);
                }
            } else {
                $("#results").html("找不到");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("[Error] cannot find the json file: " + textStatus + " - " + errorThrown);
        });
    });
});
